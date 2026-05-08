import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components"

interface TwoFactorEmailProps {
  token: string
}

const appName = process.env.NEXT_PUBLIC_APP_NAME || "Acme Inc"

export const TwoFactorEmail = ({ token }: TwoFactorEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Your 2FA Verification Code</Preview>
      <Tailwind>
        <Body className="bg-white font-sans">
          <Container className="mx-auto py-20 px-5 max-w-[480px]">
            <Heading className="text-black text-[24px] font-semibold text-center p-0 my-[30px] mx-0">
              Two-Factor Authentication
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              Hello,
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              Your two-factor authentication code is:
            </Text>
            <Section className="text-center my-[32px]">
              <Text className="text-[36px] font-bold tracking-[10px] text-black">
                {token}
              </Text>
            </Section>
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              This code will expire in 10 minutes. If you did not request this, please ignore this email.
            </Text>
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              Best regards,<br />
              {appName} Team
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default TwoFactorEmail
