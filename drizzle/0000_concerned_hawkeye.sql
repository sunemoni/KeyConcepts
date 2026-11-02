CREATE TABLE `inquiries` (
	`id` text PRIMARY KEY NOT NULL,
	`submitted_at` text NOT NULL,
	`first_name` text NOT NULL,
	`last_name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text NOT NULL,
	`query_type` text NOT NULL,
	`question` text NOT NULL
);
