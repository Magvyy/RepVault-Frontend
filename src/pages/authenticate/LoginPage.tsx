import AuthForm from "@/features/auth/components/AuthForm";


export default function LoginPage() {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <AuthForm
                endpoint="/auth/login"
                name="Login"
            />
        </div>
    )
}