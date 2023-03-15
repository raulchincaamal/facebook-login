import { FacebookFilled } from "@ant-design/icons"
import { Button } from "antd"
import Script from "next/script"
import { useEffect } from "react"

interface IFacebookButtonProps {
  handleUserData: (userData: IFacebookData) => void
  disabled?: boolean
}

const FacebookButton = ({ handleUserData, disabled }: IFacebookButtonProps) => {
  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "254336876916958",
        cookie: true,
        xfbml: true,
        version: "v16.0",
      })

      window.FB.AppEvents.logPageView()
    }
  }, [])

  const handleLogin = () => {
    window.FB.login(
      response => {
        if (response.status === "connected") {
          window.FB.api("/me", { fields: "email, name" }, response => {
            handleUserData(response)
          })
        }
      },
      {
        scope: "public_profile, email",
      }
    )
  }

  return (
    <>
      <Button
        className="facebook-form-button"
        type="primary"
        size="large"
        onClick={handleLogin}
        icon={<FacebookFilled />}
      >
        Login with Facebook
      </Button>
      <Script
        async
        defer
        crossOrigin="anonymous"
        src="https://connect.facebook.net/en_US/sdk.js"
      />
    </>
  )
}

export default FacebookButton