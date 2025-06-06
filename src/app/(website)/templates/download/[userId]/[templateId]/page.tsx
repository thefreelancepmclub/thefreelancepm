import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { getCurrentSubscription } from "@/helper/subscription";
import { prisma } from "@/lib/prisma";
import { ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import TemplateDownloadbutton from "./_components/TemplateDownloadbutton";

const Page = async ({
  params,
}: {
  params: { userId: string; templateId: string };
}) => {
  const { userId, templateId } = params;
  const data = await prisma.userPurchasedTemplate.findFirst({
    where: {
      userId: userId,
      templateId: templateId,
      isPaid: true,
    },
    include: {
      template: true,
      user: true,
    },
  });

  const currentSubscription = await getCurrentSubscription(userId);
  if (!currentSubscription) notFound();
  if (!data) notFound();

  const feature = currentSubscription.getFeature("templates");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center py-8 rounded-t-lg">
            <CheckCircle className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-2xl font-bold">Payment Successful!</h1>
            <p className="text-blue-100 mt-2">Thank you for your purchase</p>
          </CardHeader>

          <CardContent className="pt-6 pb-4 px-6">
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <h2 className="font-semibold text-lg text-blue-800 mb-4">
                Purchase Details
              </h2>

              {true ? (
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Product:</span>
                    <span className="font-medium">{data.template.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price:</span>
                    <span className="font-medium">${data.template.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium">{data.user.email}</span>
                  </div>
                </div>
              ) : (
                <p className="text-gray-600">
                  No purchase details found. If you believe this is an error,
                  please contact support.
                </p>
              )}
            </div>

            <div className="text-center text-gray-600 text-sm">
              <p className="mt-2">
                If you have any questions, please contact
                support@thefreelancepmclub.com
              </p>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-3 px-6 pb-6">
            <TemplateDownloadbutton
              file={data?.template.file ?? ""}
              title={data?.template?.title ?? ""}
              templateId={data?.templateId ?? ""}
              featureId={feature?.id ?? ""}
              templatePrice={data?.template.price ?? 0}
            />
            <Link href="/" className="w-full">
              <Button variant="outline" className="w-full">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Return to Homepage
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            Need help?{" "}
            <Link href="/contact" className="text-blue-600 hover:underline">
              Contact Support
            </Link>
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default Page;
