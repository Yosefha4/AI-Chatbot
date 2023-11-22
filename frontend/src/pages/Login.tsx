import { Box, Button, Typography } from "@mui/material";
import AiRobotImg from "../assets/airobot.png";
import CustomizedInput from "../components/shared/CustomizedInput";
import { IoIosLogIn } from "react-icons/io";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
// import toast from "react-hot-toast/headless";

function Login() {
  const auth = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      toast.loading("Signing In!", { id: "login" });
      await auth?.login(email, password);
      toast.success("Sign In Successfully", { id: "login" });
    } catch (error) {
      console.log(error);
      toast.error("Sign In Failed", { id: "login" });
    }
  };

  return (
    <Box width={"100%"} height={"100%"} display={"flex"} flex={1}>
      <Box padding={8} mt={8} display={{ md: "flex", sm: "none", xs: "none" }}>
        <img src={AiRobotImg} alt="Robot" style={{ width: "400px" }} />
      </Box>
      <Box
        display={"flex"}
        flex={{ xs: 1, md: 0.5 }}
        padding={2}
        ml={"auto"}
        mt={16}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            margin: "auto",
            padding: "30px",
            boxShadow: "10px 10px 20px #000",
            borderRadius: "10px",
            border: "none",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h4"
              textAlign="center"
              padding={2}
              fontWeight={600}
            >
              Login
            </Typography>
            <CustomizedInput name="email" type="email" label="Email" />
            <CustomizedInput name="password" type="password" label="Password" />
            <Button
              type="submit"
              endIcon={<IoIosLogIn />}
              sx={{
                px: 2,
                py: 1,
                mt: 2,
                width: "400px",
                borderRadius: 2,
                bgcolor: "#00fffc",
                fontWeight: "bold",
                ":hover": { color: "black", bgcolor: "white" },
              }}
            >
              Login
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default Login;
