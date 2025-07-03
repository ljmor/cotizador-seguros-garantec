import React, { useState } from 'react';

// --- Iconos SVG para el formulario ---
const GoogleIcon = () => (
    <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.223,0-9.655-3.449-11.303-8H6.306C9.656,39.663,16.318,44,24,44z"></path>
        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C41.38,36.148,44,30.638,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
    </svg>
);

const FacebookIcon = () => (
    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22.675 0h-21.35C.59 0 0 .59 0 1.325v21.35C0 23.41.59 24 1.325 24H12.82v-9.29h-3.128V11.41h3.128V8.987c0-3.1 1.903-4.788 4.658-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.29h-3.12V24h5.713c.734 0 1.325-.59 1.325-1.325V1.325C24 .59 23.409 0 22.675 0z" />
    </svg>
);

const AppleIcon = () => (
    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M15.226 2.5c-.736 0-1.472.42-2.115.84-.736.42-1.38.84-2.207.84-.828 0-1.473-.42-2.208-.84-.736-.42-1.38-.84-2.115-.84C4.025 2.5 2.5 4.12 2.5 6.675c0 1.68.828 3.36 2.115 4.515.736.735 1.472 1.47 2.208 1.47s1.472-.735 2.207-1.47c1.287-1.155 2.115-2.835 2.115-4.515 0-.42-.092-.84-.276-1.26.552-.105 1.103-.21 1.655-.21.552 0 1.103.105 1.655.21-.184.42-.276.84-.276 1.26 0 1.68.828 3.36 2.115 4.515.736.735 1.472 1.47 2.207 1.47s1.472-.735 2.208-1.47c1.287-1.155 2.115-2.835 2.115-4.515C21.5 4.12 19.975 2.5 17.476 2.5c-.736 0-1.38.42-2.115.84-.736.42-1.38.84-2.115.84s-1.38-.42-2.115-.84zM12 0C10.897 0 10.07 1.05 10.07 2.31c0 .525.276 1.05.736 1.47.643.42 1.38.84 2.116.84.828 0 1.565-.42 2.208-.84.46-.42.736-.945.736-1.47C15.93 1.05 15.103 0 14.07 0H12z" />
    </svg>
);

// --- Componentes Reutilizables ---
const FormInput = ({ label, placeholder, type = "text" }) => (
    <div>
        <label className="block text-sm font-semibold text-gray-500 mb-2">{label}</label>
        <input type={type} placeholder={placeholder} className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition" />
    </div>
);

const UserProfileCard = ({ name, status, imageUrl, active }) => (
    <div className={`text-center p-4 rounded-xl transition-all duration-300 ${active ? 'bg-white shadow-lg' : 'bg-green-100/50'}`}>
        <div className="relative inline-block">
            <img src={imageUrl} alt={name} className="w-16 h-16 rounded-full mx-auto" />
            <span className={`absolute bottom-1 right-1 block h-3 w-3 rounded-full border-2 border-white ${active ? 'bg-green-400' : 'bg-gray-400'}`}></span>
        </div>
        <p className={`mt-2 font-semibold ${active ? 'text-gray-800' : 'text-gray-600'}`}>{name}</p>
        <p className={`text-xs ${active ? 'text-gray-500' : 'text-gray-500'}`}>{status}</p>
    </div>
);

// --- Componentes de Formularios ---
const LoginForm = () => (
    <div className="space-y-6">
        <FormInput label="Ingrese su nombre de usuario o correo electrónico" placeholder="Nombre de usuario o correo" />
        <FormInput label="Ingrese su contraseña" placeholder="Contraseña" type="password" />
        <div className="text-right">
            <a href="#" className="text-sm font-semibold text-blue-600 hover:underline">¿Has olvidado tu contraseña?</a>
        </div>
        <button className="w-full py-3 mt-4 rounded-lg bg-[#4A5FC2] text-white font-bold text-lg hover:bg-[#3e52a7] transition shadow-md">
            Inicia sesión
        </button>
    </div>
);

const RegisterForm = () => (
    <div className="space-y-6">
        <FormInput label="Ingrese su nombre de usuario o correo electrónico" placeholder="Username or email address" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput label="Nombre de usuario" placeholder="Nombre de usuario" />
            <FormInput label="Número de contacto" placeholder="Número de contacto" />
        </div>
        <FormInput label="Ingrese su contraseña" placeholder="Contraseña" type="password" />
         <button className="w-full py-3 mt-4 rounded-lg bg-[#4A5FC2] text-white font-bold text-lg hover:bg-[#3e52a7] transition shadow-md">
            Regístrate ahora
        </button>
    </div>
);

// --- Componente Principal ---
export default function Login() {
    const [isLoginView, setIsLoginView] = useState(true);

    return (
        <div className="bg-white min-h-screen font-sans">
            {/* Fondo azul superior */}
            <div className="absolute top-0 left-0 w-full h-[60vh] bg-[#6074F3]"></div>
            
            <div className="relative min-h-screen flex items-center p-4">
                 <div className="w-full max-w-6xl mx-auto">
                    {/* CORRECCIÓN: Contenedor principal del grid */}
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-end">
                        
                        {/* Panel Izquierdo (Ahora contiene las dos secciones) */}
                        <div className="hidden lg:flex flex-col">
                            {/* Sección Superior (Sobre azul) */}
                            <div className="text-white p-8">
                                 <h1 className="text-3xl font-bold mb-4">abc<span className="font-light">seguros</span></h1>
                                <h2 className="text-5xl font-bold leading-tight">Sistema de Cotizacion</h2>
                                <p className="mt-4 text-blue-100/80 max-w-lg">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                                </p>
                            </div>
                            {/* Sección Inferior (Sobre blanco) */}
                             <div className="p-8">
                                <h3 className="font-semibold mb-4 text-gray-700">Ingresar como</h3>
                                <div className="flex gap-4">
                                    <UserProfileCard name="John peter" status="Activo hace 1 dia" imageUrl="https://placehold.co/100x100/000000/FFFFFF?text=JP" active={true} />
                                    <UserProfileCard name="Alina shmen" status="Activa hace 1 dia" imageUrl="https://placehold.co/100x100/FFFFFF/000000?text=AS" active={false} />
                                </div>
                            </div>
                        </div>

                        {/* Panel Derecho (Formulario) */}
                        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl z-10">
                            <div className="text-right mb-6">
                                <span className="text-gray-500 mr-2">{isLoginView ? '¿No tienes cuenta?' : '¿Tienes cuenta?'}</span>
                                <button onClick={() => setIsLoginView(!isLoginView)} className="font-bold text-blue-600 hover:underline">
                                    {isLoginView ? 'Regístrate' : 'Inicia sesión'}
                                </button>
                            </div>
                            <h2 className="text-4xl font-bold text-gray-800 mb-4">{isLoginView ? 'Iniciar sesión' : 'Regístrate'}</h2>
                            <p className="text-gray-500 mb-8">Bienvenido a ABCSEGUROS</p>
                            <div className="flex items-center gap-4 mb-6">
                                <button className="flex-1 flex items-center justify-center py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                                    <GoogleIcon />
                                    <span className="font-semibold text-gray-700">Ingresa con Google</span>
                                </button>
                                <button className="p-3 bg-[#1877F2] rounded-lg hover:opacity-90 transition"><FacebookIcon /></button>
                                <button className="p-3 bg-black rounded-lg hover:opacity-90 transition"><AppleIcon /></button>
                            </div>
                            <div className="my-6 flex items-center">
                                <div className="flex-grow border-t border-gray-300"></div>
                                <span className="mx-4 text-gray-400 font-semibold">O</span>
                                <div className="flex-grow border-t border-gray-300"></div>
                            </div>
                            {isLoginView ? <LoginForm /> : <RegisterForm />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}