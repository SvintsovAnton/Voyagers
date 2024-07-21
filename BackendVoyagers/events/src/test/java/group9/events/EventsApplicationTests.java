package group9.events;

import group9.events.domain.entity.Event;
import group9.events.domain.entity.Role;
import group9.events.domain.entity.User;
import group9.events.repository.GenderRepository;
import group9.events.repository.RoleRepository;
import group9.events.repository.UserRepository;
import group9.events.security.sec_dto.TokenResponseDto;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.ActiveProfiles;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.util.AssertionErrors.assertEquals;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@ActiveProfiles("test")
class EventsApplicationTests {
	@LocalServerPort
	private int port;

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private RoleRepository roleRepository;
	@Autowired
	private GenderRepository genderRepository;
	private TestRestTemplate template;
	private HttpHeaders headers;
	private Event testEvent;
	private String adminAccessToken;
	private String userAccessToken;

	private final String TEST_EVENT_TITLE = "Test event";
	private final String TEST_ADMIN_NAME = "Test Admin";
	private final String TEST_USER_NAME = "Test User";
	private final String LAST_NAME_FOR_ALLE = "Test";
	private final String TEST_PASSWORD = "Test password";
	private final String ROLE_ADMIN_TITLE = "ROLE_ADMIN";
	private final String ROLE_USER_TITLE = "ROLE_USER";
	private final String EMAIL_FOR_USER = "user@test.com";
	private final String EMAIL_FOR_ADMIN = "admin@test.com";
	private final String GENDER_MALE="Male";
	private final String GENDER_FEMALE = "Female";
	private final Date DATE_OF_BIRTH;

    {
        try {
            DATE_OF_BIRTH = new SimpleDateFormat("yyyy-MM-dd").parse("2000-01-01");
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
    }

    private final String PHONE ="+123456789";
	private final String PFOTO = "example.com";






	//Bearer 989gf89d8fg9fd8f9g8f9gf8d9gf8gf9gf8gdfg8g=ggrgt=9332frf
	private final String BEARER_PREFIX= "Bearer ";

	//константы префиксов
	private final String URL_PREFIX = "http://localhost:";
	private final String AUTH_RESOURCE_NAME="/api/auth";
	private final String EVENT_RESOURCE_NAME = "/api/events";
	private final String LOGIN_ENDPOINT = "/login";
	private String ALL_ENDPOINT = "/all";

	@BeforeEach
	public void setUp() {
		// Инициализация шаблона для REST запросов
		template = new TestRestTemplate();
		// Инициализация заголовков HTTP запросов
		headers = new HttpHeaders();

		// Создание и настройка тестового продукта
		testEvent = new Event();
		testEvent.setTitle(TEST_EVENT_TITLE);
		testEvent.setAddressStart("Berlin"); // Убедитесь, что это поле не null
		testEvent.setAddressEnd("München");
		testEvent.setStartDateTime(LocalDateTime.now());
		testEvent.setEndDateTime(LocalDateTime.now().plusDays(1));
		testEvent.setCost(BigDecimal.valueOf(200));
		testEvent.setMaximalNumberOfParticipants(5);




		// Переменные для шифрования паролей и хранения ролей
		BCryptPasswordEncoder encoder = null;
		Role roleAdmin;
		Role roleUser = null;

		// Поиск тестового админа и пользователя в базе данных
		User admin = userRepository.findFirstByLastName(TEST_ADMIN_NAME).orElse(null);
		User user = userRepository.findFirstByLastName(TEST_USER_NAME).orElse(null);

		// Проверка существования админа, если нет - создаем
		if (admin == null) {
			encoder = new BCryptPasswordEncoder();
			// Получение ролей для админа
			roleAdmin = roleRepository.findByTitle(ROLE_ADMIN_TITLE).orElseThrow(
					() -> new RuntimeException("Role Admin is missing in the database")
			);
			roleUser = roleRepository.findByTitle(ROLE_USER_TITLE).orElseThrow(
					() -> new RuntimeException("Role User is missing in the database")
			);
			// Создание нового админа
			admin = new User();
			admin.setLastName(TEST_ADMIN_NAME);
			admin.setFirstName(LAST_NAME_FOR_ALLE);
			admin.setDateOfBirth(DATE_OF_BIRTH);
			admin.setEmail(EMAIL_FOR_ADMIN);
			admin.setPassword(encoder.encode(TEST_PASSWORD));
			admin.setPhone(PHONE);
			admin.setPhone(PFOTO);
			admin.setRoles(Set.of(roleAdmin, roleUser));
			admin.setGender(genderRepository.findByGender("Male"));
			// Сохранение админа в базе данных
			userRepository.save(admin);
		}

		// Проверка существования пользователя, если нет - создаем
		if (user == null) {
			encoder = encoder == null ? new BCryptPasswordEncoder() : encoder;
			// Получение роли для пользователя, если не была загружена ранее
			roleUser = roleUser == null ? roleRepository.findByTitle(ROLE_USER_TITLE).orElseThrow(
					() -> new RuntimeException("Role User is missing in the database")
			) : roleUser;
			// Создание нового пользователя
			user = new User();
			user.setLastName(TEST_USER_NAME);
			user.setFirstName(LAST_NAME_FOR_ALLE);
			user.setDateOfBirth(DATE_OF_BIRTH);
			user.setEmail(EMAIL_FOR_USER);
			user.setPassword(encoder.encode(TEST_PASSWORD));
			user.setPhone(PHONE);
			user.setPhone(PFOTO);
			user.setRoles(Set.of(roleUser));
			user.setGender(genderRepository.findByGender("Female"));
			// Сохранение пользователя в базе данных
			userRepository.save(user);
		}

		// Логинимся
		// Подготовка данных для логина. Сбрасываем пароли для админа и пользователя, а также обнуляем их роли, так как роли будут назначены на бэкенде.

		admin.setPassword(TEST_PASSWORD);
		admin.setRoles(null);
		user.setPassword(TEST_PASSWORD);
		user.setRoles(null);

// Составляем URL для запроса
//Формируем полный URL для логина, объединяя URL_PREFIX, port, AUTH_RESOURCE_NAME и LOGIN_ENDPOINT.
		String url = URL_PREFIX + port + AUTH_RESOURCE_NAME + LOGIN_ENDPOINT;

// Формируем и отправляем запрос для админа
//Создаем объект запроса с данными админа и заголовками, отправляем его с помощью template.exchange.
//Описание:
//HttpEntity<User>: Этот класс представляет собой обертку для HTTP-запроса, который может включать тело запроса и заголовки.
//new HttpEntity<>(admin, headers): Мы создаем новый объект HttpEntity, передавая в него объект admin и заголовки headers.
//Детали:
//admin: Это объект типа User, содержащий информацию о пользователе-администраторе. Мы используем его для отправки данных пользователя в теле запроса.
//headers: Это объект типа HttpHeaders, содержащий HTTP-заголовки для запроса. Он может включать такие заголовки, как Content-Type, Accept и другие.



		HttpEntity<User> request = new HttpEntity<>(admin, headers);

//Описание:
//ResponseEntity<TokenResponseDto>: Этот класс представляет ответ HTTP-запроса, включая статус ответа, заголовки и тело ответа. Здесь он типизирован классом TokenResponseDto, что означает, //что тело ответа ожидается в виде объекта TokenResponseDto.
//template.exchange(url, HttpMethod.POST, request, TokenResponseDto.class): Мы используем метод exchange объекта TestRestTemplate для отправки HTTP-запроса и получения ответа.
//Детали:
//url: URL, к которому отправляется запрос. В данном случае это URL для аутентификации.
//HttpMethod.POST: Метод HTTP-запроса. Здесь мы используем метод POST для отправки данных.
//request: Объект HttpEntity, содержащий тело запроса (данные пользователя admin) и заголовки.
//TokenResponseDto.class: Класс, в который будет преобразовано тело ответа. Мы ожидаем, что сервер вернет объект типа TokenResponseDto, содержащий токены.


		ResponseEntity<TokenResponseDto> response = template.exchange(url, HttpMethod.POST, request, TokenResponseDto.class);

// Проверяем, что тело ответа не пустое. Убеждаемся, что ответ содержит тело с данными.
//Описание:
//assertTrue(response.hasBody(), "Auth response body is empty"): Проверка утверждения, что ответ содержит тело. Если тело ответа пустое, тест не пройдет, и будет выведено сообщение "Auth //response body is empty".
//Детали:
//response.hasBody(): Метод, который возвращает true, если ответ содержит тело, и false в противном случае.
//"Auth response body is empty": Сообщение, которое будет выведено в случае провала утверждения.

		assertTrue(response.hasBody(), "Auth response body is empty");

// Сохраняем токен доступа для админа. Извлекаем токен доступа из ответа и сохраняем его в переменной adminAccessToken.
//Описание:
//adminAccessToken = BEARER_PREFIX + response.getBody().getAccessToken(): Сохранение токена доступа для админа в переменную adminAccessToken.
//Детали:
//BEARER_PREFIX: Префикс "Bearer ", который добавляется к токену для использования в заголовках авторизации.
//response.getBody().getAccessToken(): Извлечение тела ответа и получение значения токена доступа.


		adminAccessToken = BEARER_PREFIX + response.getBody().getAccessToken();

// Формируем и отправляем запрос для пользователя.  Повторяем шаги для отправки запроса на логин, но уже с данными пользователя.
		request = new HttpEntity<>(user, headers);
		response = template.exchange(url, HttpMethod.POST, request, TokenResponseDto.class);

// Проверяем, что тело ответа не пустое.  Убеждаемся, что ответ содержит тело с данными.
		assertTrue(response.hasBody(), "Auth response body is empty");

// Сохраняем токен доступа для пользователя. Извлекаем токен доступа из ответа и сохраняем его в переменной userAccessToken
		userAccessToken = BEARER_PREFIX + response.getBody().getAccessToken();



	}

	@Test
	@Order(3)
	void testCreateEventAsAdmin() {
		headers.set("Authorization", adminAccessToken);
		HttpEntity<Event> request = new HttpEntity<>(testEvent, headers);

		ResponseEntity<Event> response = template.exchange(
				URL_PREFIX + port + EVENT_RESOURCE_NAME, HttpMethod.POST, request, Event.class);
		assertTrue(response.hasBody(), "Event creation response body is empty");
		Event createdEvent = response.getBody();
		assertNotNull(createdEvent, "Created event is null");
		System.out.println("Expected: " + TEST_EVENT_TITLE);
		System.out.println("Actual: " + createdEvent.getTitle());
		assertEquals(TEST_EVENT_TITLE, createdEvent.getTitle(), "Event title does not match");
	}

	@Test
	@Order(1)
	void testGetAllEventsAsUser() {
		headers.set("Authorization", userAccessToken);
		HttpEntity<String> request = new HttpEntity<>(headers);

		ResponseEntity<String> response = template.exchange(
				URL_PREFIX + port + EVENT_RESOURCE_NAME + ALL_ENDPOINT, HttpMethod.GET, request, String.class);
		assertTrue(response.hasBody(), "Get all events response body is empty");
	}

	@Test
	@Order(2)
	void testAccessControl() {
		headers.set("Authorization", userAccessToken);
		HttpEntity<Event> request = new HttpEntity<>(testEvent, headers);

		ResponseEntity<String> response = template.exchange(
				URL_PREFIX + port + EVENT_RESOURCE_NAME, HttpMethod.POST, request, String.class);
		assertEquals("", response.getStatusCodeValue(), "User should not be able to create an event");

		headers.set("Authorization", adminAccessToken);
		response = template.exchange(
				URL_PREFIX + port + EVENT_RESOURCE_NAME + ALL_ENDPOINT, HttpMethod.GET, request, String.class);
		assertEquals("", response.getStatusCodeValue(), "Admin should be able to get all events");
	}

	@Test
	@Order(4)
	void testInvalidLogin() {
		User invalidUser = new User();
		invalidUser.setLastName("Invalid User");
		invalidUser.setPassword("Invalid Password");

		String url = URL_PREFIX + port + AUTH_RESOURCE_NAME + LOGIN_ENDPOINT;
		HttpEntity<User> request = new HttpEntity<>(invalidUser, headers);

		ResponseEntity<String> response = template.exchange(url, HttpMethod.POST, request, String.class);
		assertEquals("", response.getStatusCodeValue(), "Invalid login should return 401 Unauthorized");
	}

	@Test
	@Order(5)
	void testEventCreationWithMissingFields() {
		headers.set("Authorization", adminAccessToken);
		Event invalidEvent = new Event();
		// Не заполняем обязательные поля

		HttpEntity<Event> request = new HttpEntity<>(invalidEvent, headers);
		ResponseEntity<String> response = template.exchange(
				URL_PREFIX + port + EVENT_RESOURCE_NAME, HttpMethod.POST, request, String.class);
		assertEquals("", response.getStatusCodeValue(), "Event creation with missing fields should return 400 Bad Request");
	}
}
