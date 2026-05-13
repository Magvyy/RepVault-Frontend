import AuthForm from "@/features/auth/components/AuthForm";


export default function RegisterPage() {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <AuthForm
                endpoint="/auth/register"
                name="Register"
            />
        </div>
    )
}