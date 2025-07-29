import ProfileForm from "@/app/my-profile/components/ProfileForm";
import { cookies } from "next/headers";

export default async function MyProfile() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value || null;
  console.log("Token in MyProfile:", token);

  return (
    <div
      className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/img/brown.png')" }}
    >
      <div className="max-w-2xl w-full bg-white bg-opacity-90 rounded-xl shadow-lg p-8 space-y-6 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/img/notes-bg.jpg')" }}>
        <h1 className="text-4xl font-bold text-gray-900 text-center">My Profile</h1>
        <p className="text-center text-lg text-gray-600 leading-relaxed">
          Welcome to my profile page. Here you can update your personal information and profile image.
        </p>
        <div className="mt-8 ">
          <ProfileForm token={token} />
        </div>
      </div>
    </div>
  );
}
