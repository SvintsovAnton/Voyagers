package group9.events;

import group9.events.domain.entity.Event;
import group9.events.domain.entity.Role;
import group9.events.domain.entity.User;
import group9.events.repository.RoleRepository;
import group9.events.repository.UserRepository;
import group9.events.security.sec_dto.TokenResponseDto;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.util.AssertionErrors.assertEquals;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class EventsApplicationTests {
	@LocalServerPort
	private int port;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RoleRepository roleRepository;

	private TestRestTemplate template;
	private HttpHeaders headers;
	private Event testEvent;

	private String adminAccessToken;
	private String userAccessToken;

	private final String TEST_EVENT_TITLE = "Test event";
	private final String TEST_ADMIN_NAME = "Test Admin";
	private final String TEST_USER_NAME = "Test User";
	private final String TEST_PASSWORD = "Test password";
	private final String ROLE_ADMIN_TITLE = "ROLE_ADMIN";
	private final String ROLE_USER_TITLE = "ROLE_USER";
	private final String BEARER_PREFIX = "Bearer ";

	private final String URL_PREFIX = "http://localhost:";
	private final String AUTH_RESOURCE_NAME = "/auth";
	private final String EVENT_RESOURCE_NAME = "/events";
	private final String LOGIN_ENDPOINT = "/login";
	private final String ALL_ENDPOINT = "/all";

	@BeforeEach
	public void setUp() {
		// Инициализация шаблона для REST запросов
		template = new TestRestTemplate();
		headers = new HttpHeaders();

		// Создание и настройка тестового события
		testEvent = new Event();
		testEvent.setTitle(TEST_EVENT_TITLE);

		BCryptPasswordEncoder encoder = null;
		Role roleAdmin;
		Role roleUser = null;

		// Поиск тестового админа и пользователя в базе данных
		User admin = userRepository.findBylastName(TEST_ADMIN_NAME).orElse(null);
		User user = userRepository.findBylastName(TEST_USER_NAME).orElse(null);

		// Проверка существования админа, если нет - создаем
		if (admin == null) {
			encoder = new BCryptPasswordEncoder();
			roleAdmin = roleRepository.findByTitle(ROLE_ADMIN_TITLE).orElseThrow(
					() -> new RuntimeException("Role Admin is missing in the database")
			);
			roleUser = roleRepository.findByTitle(ROLE_USER_TITLE).orElseThrow(
					() -> new RuntimeException("Role User is missing in the database")
			);
			admin = new User();
			admin.setLastName(TEST_ADMIN_NAME);
			admin.setPassword(encoder.encode(TEST_PASSWORD));
			admin.setRoles(Set.of(roleAdmin, roleUser));
			userRepository.save(admin);
		}

		// Проверка существования пользователя, если нет - создаем
		if (user == null) {
			encoder = encoder == null ? new BCryptPasswordEncoder() : encoder;
			roleUser = roleUser == null ? roleRepository.findByTitle(ROLE_USER_TITLE).orElseThrow(
					() -> new RuntimeException("Role User is missing in the database")
			) : roleUser;
			user = new User();
			user.setLastName(TEST_USER_NAME);
			user.setPassword(encoder.encode(TEST_PASSWORD));
			user.setRoles(Set.of(roleUser));
			userRepository.save(user);
		}

		// Логинимся как админ и пользователь
		admin.setPassword(TEST_PASSWORD);
		admin.setRoles(null);
		user.setPassword(TEST_PASSWORD);
		user.setRoles(null);

		String url = URL_PREFIX + port + AUTH_RESOURCE_NAME + LOGIN_ENDPOINT;

		HttpEntity<User> request = new HttpEntity<>(admin, headers);
		ResponseEntity<TokenResponseDto> response = template.exchange(url, HttpMethod.POST, request, TokenResponseDto.class);
		assertTrue(response.hasBody(), "Auth response body is empty");
		adminAccessToken = BEARER_PREFIX + response.getBody().getAccessToken();

		request = new HttpEntity<>(user, headers);
		response = template.exchange(url, HttpMethod.POST, request, TokenResponseDto.class);
		assertTrue(response.hasBody(), "Auth response body is empty");
		userAccessToken = BEARER_PREFIX + response.getBody().getAccessToken();
	}

	@Test
	void contextLoads() {
	}

	@Test
	void testCreateEventAsAdmin() {
		headers.set("Authorization", adminAccessToken);
		HttpEntity<Event> request = new HttpEntity<>(testEvent, headers);

		ResponseEntity<Event> response = template.exchange(
				URL_PREFIX + port + EVENT_RESOURCE_NAME, HttpMethod.POST, request, Event.class);
		assertTrue(response.hasBody(), "Event creation response body is empty");
		Event createdEvent = response.getBody();
		assertNotNull(createdEvent, "Created event is null");
		assertEquals(TEST_EVENT_TITLE, createdEvent.getTitle(), "Event title does not match");
	}

	@Test
	void testGetAllEventsAsUser() {
		headers.set("Authorization", userAccessToken);
		HttpEntity<String> request = new HttpEntity<>(headers);

		ResponseEntity<String> response = template.exchange(
				URL_PREFIX + port + EVENT_RESOURCE_NAME + ALL_ENDPOINT, HttpMethod.GET, request, String.class);
		assertTrue(response.hasBody(), "Get all events response body is empty");
	}

	@Test
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
