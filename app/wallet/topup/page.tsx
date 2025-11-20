import AppLayout from "@/components/layouts/AppLayout";
import TopUpForm from "@/components/wallet/topup/TopupForm";

const TopUpPage = () => {
  return (
    <AppLayout>
      <div className="flex flex-col items-center">
        <TopUpForm />
      </div>
    </AppLayout>
  );
};

export default TopUpPage;
