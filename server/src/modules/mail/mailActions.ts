import { Resend } from "resend";
import mailRepository from "./mailRepository";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendInvitationResponse = async (
  userId: number,
  activityId: number,
  accepted: boolean,
) => {
  const data = await mailRepository.getInvitationData(userId, activityId);
  const status = accepted ? "acceptée" : "refusée";

  await resend.emails.send({
    from: "TeamUp <onboarding@resend.dev>",
    to: data.email,
    subject: `Invitation ${status} : ${data.activity_name}`,
    html: `<p>Vous avez ${status} l'invitation pour "${data.activity_name}".</p>`,
  });
};

export default { sendInvitationResponse };
