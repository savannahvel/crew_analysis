INSERT INTO department (name)
VALUES ("engineering"),
       ("quality_assurance");

INSERT INTO role (title, salary, department_id)
VALUES
    ("engineer", 100000, 001),
    ("engineer_manager", 200000, 001),
    ("qa", 80000, 002),
    ("qa_manager", 150000, 002);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ("Ned", "Flanders", 002, 001),
    ("Edna", "Krabappel", 001, 001), 
    ("Lisa", "Simpson", 001, 001),
    ("Carl", "Carlson", 004, 004),
    ("Krusty", "The Clown", 003, 004);