import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";

const LoginForm = () => {
  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      // Handle login logic here
      toast({
        title: "Login successful.",
        description: "You have logged in successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  return (
    <Box
      maxW="md"
      mx="auto"
      mt={10}
      p={5}
      borderWidth={1}
      borderRadius="lg"
      bg="white"
    >
      <form onSubmit={formik.handleSubmit}>
        <FormControl
          id="email"
          isInvalid={formik.touched.email && formik.errors.email}
          mb={4}
        >
          <FormLabel>Email</FormLabel>
          <Input type="email" {...formik.getFieldProps("email")} />
          <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
        </FormControl>

        <FormControl
          id="password"
          isInvalid={formik.touched.password && formik.errors.password}
          mb={4}
        >
          <FormLabel>Password</FormLabel>
          <Input type="password" {...formik.getFieldProps("password")} />
          <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
        </FormControl>

        <Button type="submit" colorScheme="blue" isFullWidth mt={4}>
          Login
        </Button>
      </form>
    </Box>
  );
};

export default LoginForm;
