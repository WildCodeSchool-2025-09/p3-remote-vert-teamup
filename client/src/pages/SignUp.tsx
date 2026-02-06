import { Box, Button, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import "../styles/signUp.css";

type SignUpForm = {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  address: string;
  city: string;
  zipCode: string;
  phone: string;
  picture: string;
};

function SignUp() {
  const [signUpForm, setSignUpForm] = useState<SignUpForm>({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    address: "",
    city: "",
    zipCode: "",
    phone: "",
    picture: "",
  });
  const [message, setMessage] = useState<string>("");
  const messageSuccess = "Compte créé avec succès !";
  const messageRef = useRef<HTMLParagraphElement | null>(null);
  useEffect(() => {
    if (message && messageRef.current) {
      messageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [message]);
  const Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3310/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signUpForm),
      });
      if (!response.ok) {
        switch (response.status) {
          case 400:
            setMessage("Données saissi invalides");
            break;
          case 409:
            setMessage("Nom d'utilisateur déjà existant");
            break;
          default:
            setMessage("Erreur serveur");
        }
        return;
      }
      setMessage(messageSuccess);
    } catch (error) {
      setMessage("Impossible de contacter le serveur");
    }
  };
  const ChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSignUpForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div id="sign-up">
      <h1>CÉER UN COMPTE</h1>
      <Box
        component="form"
        noValidate
        onSubmit={Submit}
        sx={{
          marginTop: "2vh",
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "3vh",
        }}
      >
        <TextField
          label="Nom d'utilisateur"
          required
          variant="outlined"
          size="small"
          name="username"
          value={signUpForm.username}
          onChange={ChangeInput}
        />
        <TextField
          label="Mot de passe"
          type="password"
          autoComplete="password"
          required
          variant="outlined"
          size="small"
          name="password"
          value={signUpForm.password}
          onChange={ChangeInput}
        />
        <TextField
          label="Confirme mot de passe"
          type="password"
          autoComplete="confirmPassword"
          required
          variant="outlined"
          size="small"
          name="confirmPassword"
          value={signUpForm.confirmPassword}
          onChange={ChangeInput}
        />
        <TextField
          label="Email"
          required
          variant="outlined"
          size="small"
          name="email"
          value={signUpForm.email}
          onChange={ChangeInput}
        />
        <TextField
          label="Prénom"
          required
          variant="outlined"
          size="small"
          name="firstName"
          value={signUpForm.firstName}
          onChange={ChangeInput}
        />
        <TextField
          label="Nom"
          required
          variant="outlined"
          size="small"
          name="lastName"
          value={signUpForm.lastName}
          onChange={ChangeInput}
        />
        <TextField
          label="Date de naissance"
          type="date"
          required
          variant="outlined"
          size="small"
          name="dateOfBirth"
          value={signUpForm.dateOfBirth}
          onChange={ChangeInput}
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <TextField
          label="Address"
          required
          variant="outlined"
          size="small"
          name="address"
          value={signUpForm.address}
          onChange={ChangeInput}
        />
        <TextField
          label="Ville"
          required
          variant="outlined"
          size="small"
          name="city"
          value={signUpForm.city}
          onChange={ChangeInput}
        />
        <TextField
          label="Code postal"
          required
          variant="outlined"
          size="small"
          name="zipCode"
          value={signUpForm.zipCode}
          onChange={ChangeInput}
        />
        <TextField
          label="Téléphone"
          required
          variant="outlined"
          size="small"
          name="phone"
          value={signUpForm.phone}
          onChange={ChangeInput}
        />
        <TextField
          label="URL photo"
          variant="outlined"
          size="small"
          name="picture"
          value={signUpForm.picture}
          onChange={ChangeInput}
        />
        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{
            fontSize: "button-mobile",
            backgroundColor: "var(--button-color)",
            "&:hover": {
              backgroundColor:
                "color-mix(in srgb, var(--button-color) 85%, black)",
            },
          }}
        >
          Envoyer
        </Button>
      </Box>
      <p
        ref={messageRef}
        className={
          message === messageSuccess ? "message-success" : "message-error"
        }
      >
        {message}
      </p>
    </div>
  );
}

export default SignUp;
