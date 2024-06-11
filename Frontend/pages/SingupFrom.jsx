// import { useFormik } from "formik";
// import * as Yup from "yup";
// import {
//   Box,
//   Button,
//   FormControl,
//   FormLabel,
//   Input,
//   FormErrorMessage,
//   useToast,
// } from "@chakra-ui/react";

// const SignUpForm = () => {
//   const toast = useToast();

//   const formik = useFormik({
//     initialValues: {
//       username: "",
//       email: "",
//       password: "",
//     },
//     validationSchema: Yup.object({
//       username: Yup.string().required("Username is required"),
//       email: Yup.string()
//         .email("Invalid email address")
//         .required("Email is required"),
//       password: Yup.string()
//         .min(6, "Password must be at least 6 characters")
//         .required("Password is required"),
//     }),
//     onSubmit: (values) => {
//       toast({
//         title: "Form submitted.",
//         description: "Your form has been submitted successfully.",
//         status: "success",
//         duration: 5000,
//         isClosable: true,
//       });
//     },
//   });

//   return (
//     <Box
//       maxW="md"
//       mx="auto"
//       mt={10}
//       p={5}
//       borderWidth={1}
//       borderRadius="lg"
//       bg="white"
//     >
//       <form onSubmit={formik.handleSubmit}>
//         <FormControl
//           id="username"
//           isInvalid={formik.touched.username && formik.errors.username}
//           mb={4}
//         >
//           <FormLabel>Username</FormLabel>
//           <Input type="text" {...formik.getFieldProps("username")} />
//           <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
//         </FormControl>

//         <FormControl
//           id="email"
//           isInvalid={formik.touched.email && formik.errors.email}
//           mb={4}
//         >
//           <FormLabel>Email</FormLabel>
//           <Input type="email" {...formik.getFieldProps("email")} />
//           <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
//         </FormControl>

//         <FormControl
//           id="password"
//           isInvalid={formik.touched.password && formik.errors.password}
//           mb={4}
//         >
//           <FormLabel>Password</FormLabel>
//           <Input type="password" {...formik.getFieldProps("password")} />
//           <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
//         </FormControl>

//         <Button type="submit" colorScheme="blue" isFullWidth mt={4}>
//           Submit
//         </Button>
//       </form>
//     </Box>
//   );
// };

// export default SignUpForm;

import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Navigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";

const SignUpForm = () => {
  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        await axios.post("http://localhost:8000/user/register", values);
        toast({
          title: "Form submitted.",
          description: "Your form has been submitted successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        Navigate("/login"); // Redirect to login page
      } catch (error) {
        toast({
          title: "Submission failed.",
          description:
            error.response?.data?.message ||
            "An error occurred while submitting the form.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
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
          id="username"
          isInvalid={formik.touched.username && formik.errors.username}
          mb={4}
        >
          <FormLabel>Username</FormLabel>
          <Input type="text" {...formik.getFieldProps("username")} />
          <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
        </FormControl>

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
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default SignUpForm;
