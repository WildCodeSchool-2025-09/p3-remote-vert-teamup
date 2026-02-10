import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendAnswerInvitationEmail({
  organizerEmail,
  organizerUsername,
  activityName,
  participantUsername,
  status,
}: AnswerInvitationEmail) {
  if (status === "accepted") {
    const response = await resend.emails.send({
      from: "TeamUp <noreply@linkrefine.com>",
      to: organizerEmail,
      subject: `${participantUsername} a accepté votre invitation`,
      html: `
        <h2>Bonne nouvelle, ${organizerUsername} !</h2>
        <p><strong>${participantUsername}</strong> a accepté votre invitation pour l'activité <strong>${activityName}</strong>.</p>
        <p>Rendez-vous sur TeamUp pour voir les détails.</p>
      `,
    });

    return response;
  }

  if (status === "refused") {
    const response = await resend.emails.send({
      from: "TeamUp <noreply@linkrefine.com>",
      to: organizerEmail,
      subject: `${participantUsername} a réfusé votre invitation`,
      html: `
        <h2>Mauvaise nouvelle, ${organizerUsername} !</h2>
        <p><strong>${participantUsername}</strong> a refusé votre invitation pour l'activité <strong>${activityName}</strong>.</p>
      `,
    });
    return response;
  }
}

async function sendInvitationEmail({
  participantEmail,
  organizerUsername,
  activityName,
  participantUsername,
}: InvitationEmail) {
  const response = await resend.emails.send({
    from: "TeamUp <noreply@linkrefine.com>",
    to: participantEmail,
    subject: `${organizerUsername} vous a invité à son activité !`,
    html: `
        <h2>Bonne nouvelle, ${participantUsername} !</h2>
        <p><strong>${organizerUsername}</strong> vous a invité à son activité <strong>${activityName}</strong>.</p>
        <p>Rendez-vous sur TeamUp pour voir les détails.</p>
      `,
  });
  return response;
}

async function sendAnswerRequestEmail({
  participantEmail,
  participantUsername,
  organizerUsername,
  activityName,
  status,
}: AnswerRequestEmail) {
  if (status === "accepted") {
    const response = await resend.emails.send({
      from: "TeamUp <noreply@linkrefine.com>",
      to: participantEmail,
      subject: `${organizerUsername} a accepté votre demande`,
      html: `
        <h2>Bonne nouvelle, ${participantUsername} !</h2>
        <p><strong>${organizerUsername}</strong> a accepté votre demande pour l'activité <strong>${activityName}</strong>.</p>
        <p>Rendez-vous sur TeamUp pour voir les détails.</p>
      `,
    });
    return response;
  }

  if (status === "refused") {
    const response = await resend.emails.send({
      from: "TeamUp <noreply@linkrefine.com>",
      to: participantEmail,
      subject: `${organizerUsername} a réfusé votre invitation`,
      html: `
        <h2>Mauvaise nouvelle, ${participantUsername} !</h2>
        <p><strong>${organizerUsername}</strong> a refusé votre demande pour l'activité <strong>${activityName}</strong>.</p>
      `,
    });
    return response;
  }
}

export default {
  sendAnswerInvitationEmail,
  sendInvitationEmail,
  sendAnswerRequestEmail,
};
