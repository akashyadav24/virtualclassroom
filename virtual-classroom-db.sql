create schema `toddle-virtual-classroom`;
use `toddle-virtual-classroom`;

# usertype : t=tutor, s=student
create table `users` (user_id int not null AUTO_INCREMENT, username varchar(100) not null, password varchar(255) not null, usertype enum('t','s') not null, PRIMARY KEY (user_id) );

create table `assignment` (ass_id int not null AUTO_INCREMENT, ass_desc longtext not null, tutor_id int, student_ids varchar(255), publish_date datetime, due_date datetime, PRIMARY KEY (ass_id) );

create table `submission` ( id int not null AUTO_INCREMENT, ass_id int not null, student_id int not null, link varchar(255), date datetime, remark varchar(255), PRIMARY KEY (id));

#select * from `users`;
#select * from `assignment`;
#select * from `submission`;


