db.createUser({
  user: "yogi",
  pwd: "1234qwerasdf",
  roles: [
    {
      role: "dbAdmin",
      db: "home-inventory",
    },
  ],
});
