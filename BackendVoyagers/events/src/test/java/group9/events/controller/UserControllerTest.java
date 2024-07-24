package group9.events.controller;

import group9.events.domain.dto.UserDto;
import group9.events.domain.entity.*;
import group9.events.repository.*;
import group9.events.security.sec_dto.TokenResponseDto;
import org.hibernate.Hibernate;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@ActiveProfiles("test")
class UserControllerTest {

    @LocalServerPort
    private int port;


    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private GenderRepository genderRepository;


    private TestRestTemplate template;
    private HttpHeaders headers;
    private Event testEvent;
    private String adminAccessToken;
    private String userAccessToken;



    private final String TEST_ADMIN_NAME = "Test Admin";
    private final String TEST_USER_NAME = "Test User";
    private final String LAST_NAME_FOR_ALLE = "Test";
    private final String TEST_PASSWORD = "TestPasword!";
    private final String ROLE_ADMIN_TITLE = "ROLE_ADMIN";
    private final String ROLE_USER_TITLE = "ROLE_USER";
    private final String EMAIL_FOR_USER = "usertest@test.com";
    private final String EMAIL_FOR_ADMIN = "admintest@test.com";
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





    private final String BEARER_PREFIX= "Bearer ";


    private final String URL_PREFIX = "http://localhost:";
    private final String AUTH_RESOURCE_NAME="/api/auth";
    private final String USER_RESOURCE_NAME = "/api/users";
    private final String LOGIN_ENDPOINT = "/login";

    private String BLOCK_ENDPOINT="/block";

    private String SLASH ="/";



    static Long USER_ID;


   static User user;

   static User admin;

   static Set<Role> roleForAdmin;
   static Set<Role> roleForUser;


    @BeforeEach
    public void setUp(){

        template = new TestRestTemplate();
        headers= new HttpHeaders();

        testEvent = new Event();

        BCryptPasswordEncoder encoder = null;
        Role roleAdmin;
        Role roleUser = null;

         admin = userRepository.findByEmail(EMAIL_FOR_ADMIN).orElse(null);
         user = userRepository.findByEmail(EMAIL_FOR_USER).orElse(null);


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
            admin.setFirstName(LAST_NAME_FOR_ALLE);
            admin.setDateOfBirth(DATE_OF_BIRTH);
            admin.setEmail(EMAIL_FOR_ADMIN);
            admin.setPassword(encoder.encode(TEST_PASSWORD));
            admin.setPhone(PHONE);
            admin.setPhone(PFOTO);
            roleForAdmin =Set.of(roleAdmin, roleUser);
            admin.setRoles(roleForAdmin);
            admin.setGender(genderRepository.findByGender(GENDER_MALE));
            admin.setActive(true);
            userRepository.save(admin);
        }

        if (user == null) {
            encoder = encoder == null ? new BCryptPasswordEncoder() : encoder;
            roleUser = roleUser == null ? roleRepository.findByTitle(ROLE_USER_TITLE).orElseThrow(
                    () -> new RuntimeException("Role User is missing in the database")
            ) : roleUser;
            user = new User();
            user.setLastName(TEST_USER_NAME);
            user.setFirstName(LAST_NAME_FOR_ALLE);
            user.setDateOfBirth(DATE_OF_BIRTH);
            user.setEmail(EMAIL_FOR_USER);
            user.setPassword(encoder.encode(TEST_PASSWORD));
            user.setPhone(PHONE);
            user.setPhoto(PFOTO);
            roleForUser = Set.of(roleUser);
            user.setRoles(roleForUser);
            user.setGender(genderRepository.findByGender(GENDER_FEMALE));
            user.setActive(true);
            userRepository.save(user);
        }

        USER_ID=userRepository.findByEmail(EMAIL_FOR_USER).get().getId();

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
    @Order(1)
    void getAllUsers() {
        String url = URL_PREFIX+port+USER_RESOURCE_NAME;
        headers.set("Authorization", adminAccessToken);
        HttpEntity<Void> request = new HttpEntity<>(headers);
        ResponseEntity<UserDto[]> response =  template.exchange(url,HttpMethod.GET,request,UserDto[].class);
        List<UserDto> listOfUserDto = Arrays.asList(response.getBody());
        assertFalse(listOfUserDto.isEmpty());
    }

    @Test
    @Order(2)
    void blockUser() {
        String url = URL_PREFIX+port+USER_RESOURCE_NAME+BLOCK_ENDPOINT+SLASH+USER_ID;
        headers.set("Authorization", adminAccessToken);
        HttpEntity<Void> request = new HttpEntity<>(headers);
        ResponseEntity<UserDto> response = template.exchange(url,HttpMethod.PUT,request, UserDto.class);
        assertTrue(response.getBody().getEmail().equals(EMAIL_FOR_USER));
        assertEquals(userRepository.findById(USER_ID).orElse(null).getActive(),false);
    }
}