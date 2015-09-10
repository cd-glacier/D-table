create table zyoushisu_subjects(
	code text primary key,
	subname text,
	dates text,
	classes integer,
	counter integer default 0,
	semester text,
	grade integer,
	credit integer,
	this_url text,
	last_url text,
	remark integer default 0
);

create table classes(
	id integer primary key,
	name text
);
