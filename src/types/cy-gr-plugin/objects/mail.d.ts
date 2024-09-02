type BaseMailSendSubmitEventObject = {
  type: string;
  error: string;
  mail: SendSubmitMail;
};

type BaseMailDetailShowEventObject = {
  type: string;
  mail: DetailShowMail;
};

type SendSubmitMail = {
  mail: {
    subject: string;
    body?: string;
    isHtmlMail: boolean;
    htmlBody?: string;
    signature: string;
    dispositionNotification: boolean;
    actionType?: "NEW" | "REPLY" | "FORWARD" | "RESEND";
    from: MailUser;
    to: MailUser[];
    cc: MailUser[];
    bcc: MailUser[];
    attachments: MailAttachment[];
  };
};

type DetailShowMail = {
  mail: {
    id: string;
    subject: string;
    body?: string;
    date?: string;
    isHtmlMail: boolean;
    htmlBody?: string;
    signature: string;
    dispositionNotification: boolean;
    type: "draft" | "received" | "sent";
    from: MailUser;
    to: MailUser[];
    cc: MailUser[];
    bcc: MailUser[];
    attachments: MailAttachment[];
  };
  preview: boolean;
};

type MailAttachment = {
  id: string;
  name: string;
  contentType: string;
  size: string;
};

type MailUser = {
  name: string;
  mailAddress: string;
};

type MailMailSendSubmit = BaseMailSendSubmitEventObject;

type MailMailDetailShow = BaseMailDetailShowEventObject;
