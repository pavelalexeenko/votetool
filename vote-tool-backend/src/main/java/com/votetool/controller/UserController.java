package com.votetool.controller;

import com.votetool.model.User;
import com.votetool.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/users")
public class UserController {

    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @RequestMapping(path = "/", method = RequestMethod.POST)
    public User createUser(@Valid @RequestBody User user) {
        return userService.save(user);
    }

    @RequestMapping(path = "/", method = RequestMethod.GET)
    public List<User> getAllUsers(
            @RequestParam("page") Optional<Integer> page,
            @RequestParam("size") Optional<Integer> size) {

        if (page.isPresent() && size.isPresent()) {
            return userService.findAll(new PageRequest(page.get(), size.get()));
        }

        return userService.findAll();
    }

    @RequestMapping(path = "/{id}", method = RequestMethod.GET)
    public User getUser(@PathVariable String id) {
        return userService.findById(id);
    }

    @RequestMapping(path = "/", method = RequestMethod.PUT)
    public List<User> updateUsers(@Valid @RequestBody List<User> users) {
        return userService.save(users);
    }

    @RequestMapping(path = "/{id}", method = RequestMethod.PUT)
    public User updateUser(@RequestParam("id") String id, @Valid @RequestBody User user) {
        user.setId(id);
        return userService.save(user);
    }

    @RequestMapping(path = "/", method = RequestMethod.DELETE)
    public void deleteAllUsers() {
        userService.deleteAll();
    }

    @RequestMapping(path = "/{id}", method = RequestMethod.DELETE)
    public void deleteUser(@PathVariable String id) {
        userService.delete(id);
    }
}
