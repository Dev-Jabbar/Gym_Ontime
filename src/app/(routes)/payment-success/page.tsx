"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { TbCircleCheck, TbCircleX, TbLoader2 } from "react-icons/tb";

type VerificationStatus = "loading" | "success" | "error";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<VerificationStatus>("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const reference = searchParams.get("reference");

    if (!reference) {
      setStatus("error");
      setMessage("No payment reference found.");
      return;
    }

    fetch(`http://localhost:5000/api/payments/verify?reference=${reference}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStatus("success");
          setMessage(data.message || "Payment verified successfully!");
        } else {
          setStatus("error");
          setMessage(data.message || "Payment verification failed.");
        }
      })
      .catch(() => {
        setStatus("error");
        setMessage("Something went wrong while verifying your payment.");
      });
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-xl shadow-sm p-8 max-w-md w-full text-center">
        {status === "loading" && (
          <>
            <TbLoader2 className="w-16 h-16 text-orange-500 mx-auto mb-4 animate-spin" />
            <h1 className="text-xl font-bold text-gray-900 mb-2">
              Verifying your payment...
            </h1>
            <p className="text-gray-600">Please wait a moment.</p>
          </>
        )}

        {status === "success" && (
          <>
            <TbCircleCheck className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-xl font-bold text-gray-900 mb-2">
              Payment Successful!
            </h1>
            <p className="text-gray-600 mb-6">{message}</p>
            <button
              onClick={() => router.push("/subscriptions")}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-medium transition-colors"
            >
              View My Subscriptions
            </button>
          </>
        )}

        {status === "error" && (
          <>
            <TbCircleX className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-xl font-bold text-gray-900 mb-2">
              Payment Verification Failed
            </h1>
            <p className="text-gray-600 mb-6">{message}</p>
            <button
              onClick={() => router.push("/schedule")}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg font-medium transition-colors"
            >
              Back to Schedule
            </button>
          </>
        )}
      </div>
    </div>
  );
}
