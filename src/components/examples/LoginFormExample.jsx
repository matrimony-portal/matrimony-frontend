/**
 * Example: Login Form with React Hook Form + Zod
 * This demonstrates the new patterns for forms
 *
 * Replace your existing Login component with this pattern
 */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../schemas/authSchemas.js";
import { useAuthStore } from "../../stores/useAuthStore.js";
import { useApiCall } from "../../hooks/useApiCall.js";
import { Input } from "../ui/Input.jsx";
import { Button } from "../ui/Button.jsx";
import { useNavigate } from "react-router";

export function LoginFormExample() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const { execute, loading } = useApiCall();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onBlur", // Validate on blur for better UX
  });

  const onSubmit = async (data) => {
    try {
      await execute(() => login(data.email, data.password, data.userType), {
        successMessage: "Login successful!",
        errorMessage: "Login failed. Please check your credentials.",
      });

      // Navigate based on user type
      const userType = data.userType;
      if (userType === "admin") {
        navigate("/dashboard/admin");
      } else if (userType === "organizer") {
        navigate("/dashboard/organizer");
      } else {
        navigate("/dashboard/free");
      }
    } catch (error) {
      // Error is already handled by useApiCall
      console.error("Login error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label htmlFor="userType" className="form-label">
          User Type <span className="text-danger">*</span>
        </label>
        <select
          id="userType"
          className={`form-select ${errors.userType ? "is-invalid" : ""}`}
          {...register("userType")}
        >
          <option value="">Select user type</option>
          <option value="user">User</option>
          <option value="organizer">Event Organizer</option>
          <option value="admin">Admin</option>
        </select>
        {errors.userType && (
          <div className="invalid-feedback">{errors.userType.message}</div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email <span className="text-danger">*</span>
        </label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          {...register("email")}
          error={errors.email?.message}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password <span className="text-danger">*</span>
        </label>
        <Input
          id="password"
          type="password"
          placeholder="Enter your password"
          {...register("password")}
          error={errors.password?.message}
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        className="w-100"
        isLoading={loading}
        loadingText="Logging in..."
      >
        Login
      </Button>
    </form>
  );
}
