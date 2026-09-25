export async function POST(request) {
  let data;
  try {
    data = await request.json();
  } catch {
    return Response.json(
      { ok: false, errors: { form: 'Requête invalide' } },
      { status: 400 }
    );
  }

  const errors = validateContact(data);

  if (Object.keys(errors).length > 0) {
    return Response.json({ ok: false, errors }, { status: 400 });
  }

  return Response.json({ ok: true });
}

function validateContact(data) {
  const errors = {};

  const name = typeof data.name === 'string' ? data.name.trim() : '';
  const email = typeof data.email === 'string' ? data.email.trim() : '';
  const service = typeof data.service === 'string' ? data.service.trim() : '';
  const message = typeof data.message === 'string' ? data.message.trim() : '';

  if (!name) {
    errors.name = 'Nom requis';
  }

  if (!email) {
    errors.email = 'Adresse e-mail requise';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Adresse e-mail invalide';
  }

  if (!service) {
    errors.service = 'Service requis';
  }

  if (!message) {
    errors.message = 'Message requis';
  }

  if (data.consent !== true) {
    errors.consent = 'Vous devez accepter le traitement de vos données';
  }

  return errors;
}