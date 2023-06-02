/**
 * Created by Vladimir on 12/31/17.
 */
export interface Feedback {
  firstname: string | null;
  lastname: string | null;
  telnum: number | null;
  email: string | null;
  agree: boolean | null;
  contacttype: string | null;
  message: string | null;
};

export const ContactType = ['None', 'Tel', 'Email'];
