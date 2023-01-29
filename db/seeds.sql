INSERT INTO department (id, name)
VALUES (001, "engineering"),
       (002, "quality_assurance");

INSERT INTO role (id, title, salary, department_id)
VALUES
    (001, "engineer", 100000, 001),
    (002, "engineer_manager", 200000, 001),
    (003, "qa", 80000, 002),
    (004, "qa_manager", 150000, 002);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES
    (001, "Ned", "Flanders", 002, 001),
    (002, "Edna", "Krabappel", 001, 001), 
    (003, "Lisa", "Simpson", 001, 001),
    (004, "Carl", "Carlson", 004, 004),
    (005, "Krusty", "The Clown", 003, 004);