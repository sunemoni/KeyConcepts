import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
export const inquiries = sqliteTable('inquiries', {
 id: text('id').primaryKey(),
 submittedAt: text('submitted_at').notNull(),
 firstName: text('first_name').notNull(),
 lastName: text('last_name').notNull(),
 email: text('email').notNull(),
 phone: text('phone').notNull(),
 type: text('query_type').notNull(),
 question: text('question').notNull(),
});
