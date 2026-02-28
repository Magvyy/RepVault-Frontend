import AuthForm from "@/features/auth/components/AuthForm";


export default function RegisterPage() {
    return (
        <div className="p-5">
            <AuthForm
                endpoint="/auth/register"
                name="Register"
            />
        </div>
    )
}