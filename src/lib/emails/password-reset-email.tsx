import { Body, Html, Button, Text, Tailwind, Row, Column, Img, Container, Section, Link, Head } from '@react-email/components';

type ResetPasswordProps = {
    name: string;
    resetLink: string;
}
const baseURL = process.env.SITE_URL ? process.env.SITE_URL : "";

function ResetPasswordEmail({ name, resetLink }: ResetPasswordProps) {
    return (
        <Html>
            <Head>
                <style>
                    {`
                        @media (max-width: 576px) {
                            .container-box {
                                padding: 1rem;
                                width: 100% !important;
                            }
                            .title-text {
                                font-size: 1.5rem !important;
                            }
                            .btn {
                                width: 100% !important;
                                padding: 0.75rem !important;
                            }
                        }
                    `}
                </style>
            </Head>
            <Tailwind
                config={{
                    theme: {
                        extend: {
                            colors: {
                                primary: 'hsl(266 98% 60%)',
                                secondary: '#3C4242',
                                background: '#F9FAFB',
                                text: '#374151'
                            }
                        }
                    }
                }}
            >
                <Body className="bg-background p-6">
                    <Container className="container-box border border-neutral-300 rounded-lg p-6 max-w-[576px] bg-white shadow-md">
                        <Section className="text-center">
                            <Img src={`${baseURL}/static/Logo.png`} alt="Euphoria Logo" className="h-20 w-20 object-contain mx-auto mb-6" />
                            <Section className="relative overflow-hidden h-[350px] w-full">
                            <Img src={`${baseURL}/static/reset-password.png`} className="h-[350px] w-full object-cover object-top rounded-md mx-auto" />
                            <Section style={{
                                background: 'linear-gradient(60deg, #7747ff, 7%, rgba(0, 0, 0, 0.5) 100%)'
                                ,
                            }} className="absolute h-full w-full  inset-0 grid place-items-center">
                                
                            <Text className="title-text max-w-[400px] !mx-auto w-full block text-4xl font-bold uppercase text-white/90 mb-4">
                                Password Reset Request
                            </Text>
                            </Section>
                            </Section>
                            <Text className="text-left text-text text-lg mb-6">
                                Hi {name}, we received a request to reset your password. Click the button below to set up a new password:
                            </Text>
                            <Button className="btn block max-w-fit bg-primary rounded-md mt-4 px-4 py-3 font-medium text-white text-left" href={resetLink}>
                                Reset Password
                            </Button>
                            <Text className="text-left text-text text-sm mt-6">
                                If you did not request a password reset, please ignore this email or contact support.
                            </Text>
                            <Text className="text-left text-text text-sm mt-6">
                                Best regards, <br />
                                The Euphoria Team
                            </Text>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}

ResetPasswordEmail.PreviewProps = {
    name: 'Jane Doe',
    resetLink: 'https://yourwebsite.com/reset-password?token=abc123'
}

export default ResetPasswordEmail;
