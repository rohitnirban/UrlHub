import {
    Body,
    Button,
    Container,
    Head,
    Html,
    Img,
    Preview,
    Section,
    Text,
} from "@react-email/components";
import * as React from "react";

interface ResetPasswordEmailProps {
    userFirstname?: string;
    resetPasswordLink?: string;
}


export const ResetPasswordEmail = ({
    userFirstname,
    resetPasswordLink,
}: ResetPasswordEmailProps) => {
    return (
        <Html>
            <Head />
            <Preview>Reset your password</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Img
                        src={`https://res.cloudinary.com/dpagdxk01/image/upload/fl_preserve_transparency/v1734450640/logo-blue_uzgzgl.jpg`}
                        width="45"
                        height="45"
                        alt="UrlHub"
                    />
                    <Section>
                        <Text style={text}>Hi {userFirstname},</Text>
                        <Text style={text}>
                            Someone recently requested a password change for your UrlHub
                            account. If this was you, you can set a new password here:
                        </Text>
                        <Text style={text}>
                            This link is only valid for 15 minutes.
                        </Text>
                        <Button style={button} href={resetPasswordLink}>
                            Reset password
                        </Button>
                        <Text style={text}>
                            If you don&apos;t want to change your password or didn&apos;t
                            request this, just ignore and delete this message.
                        </Text>
                        <Text style={text}>
                            To keep your account secure, please don&apos;t forward this email
                            to anyone.
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
};

export default ResetPasswordEmail;

const main = {
    backgroundColor: "#f6f9fc",
    padding: "10px 0",
    fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
};

const container = {
    backgroundColor: "#ffffff",
    border: "1px solid #f0f0f0",
    padding: "45px",
};

const text = {
    fontSize: "16px",
    color: "#404040",
    lineHeight: "26px",
};

const button = {
    backgroundColor: "#007ee6",
    borderRadius: "4px",
    color: "#fff",
    fontSize: "15px",
    textDecoration: "none",
    textAlign: "center" as const,
    display: "block",
    width: "210px",
    padding: "14px 7px",
};
