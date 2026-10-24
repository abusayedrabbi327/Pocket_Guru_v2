import { query } from './db.js';

async function ensureAdmin() {
  const adminEmail = 'abusayed102188@gmail.com';
  try {
    const r = await query('SELECT * FROM public.profiles WHERE email = $1', [adminEmail]);
    if (r.rows.length === 0) {
      const ins = await query(`
        INSERT INTO public.profiles (id, name, email, role, salary, subscription)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
      `, ['usr_admin_sayed', 'Abu Sayed (Admin)', adminEmail, 'admin', 100000, 'elite']);
      console.log('Admin profile created successfully:', ins.rows[0]);
    } else {
      await query('UPDATE public.profiles SET role = $1 WHERE email = $2', ['admin', adminEmail]);
      console.log('Admin profile role verified and set to admin.');
    }
  } catch (err) {
    console.error('Error ensuring admin:', err);
  } finally {
    process.exit(0);
  }
}

ensureAdmin();
