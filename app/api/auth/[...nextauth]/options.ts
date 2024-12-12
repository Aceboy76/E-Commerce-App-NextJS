import EmailProvider from 'next-auth/providers/nodemailer';
   
providers: [
  EmailProvider({
    server: process.env.EMAIL_SERVER,
    from: process.env.EMAIL_FROM,
    sendVerificationRequest({
      identifier: email,
      url,
      provider: { server, from },
    }) {
      /* your function */
    },
  }),
]