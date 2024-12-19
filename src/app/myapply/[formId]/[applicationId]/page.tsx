import fetchApplicationData from "./fetchApplicationData";
import Title from "@/app/alba/components/Title";
import Content from "@/app/alba/components/Content";
import ApplicantInfo from "@/app/alba/components/ApplicantInfo";
import MyApplication from "@/app/alba/components/MyApplication";
import fetchAlbarformDetailData from "@/app/alba/[formId]/fetchAlbarformDetailData";
import Carousel from "@/components/Carousel/Carousel";
import { AlbaformDetailData, MyApplicationData } from "@/types/alba";

export const metadata = {
  title: "내 지원내역 상세 보기",
  description: "Albarform - 내 지원내역 상세 보기 페이지입니다",
};

interface MyApplyPageProps {
  params: Promise<{ formId: string; applicationId: string }>;
}

const MyApplyPage = async ({ params }: MyApplyPageProps) => {
  let albarformData: AlbaformDetailData;
  let myApplicationData: MyApplicationData;
  const { formId, applicationId } = await params;

  try {
    [albarformData, myApplicationData] = await Promise.all([
      fetchAlbarformDetailData(formId),
      fetchApplicationData(applicationId),
    ]);
  } catch (error) {
    console.error(error);

    return (
      <div>
        <h1>데이터를 불러올 수 없습니다.</h1>
        <p>잠시 후 다시 시도해주세요.</p>
      </div>
    );
  }

  return (
    <>
      {albarformData.imageUrls && (
        <Carousel imageUrls={albarformData.imageUrls} />
      )}
      <div className="flex flex-col gap-4">
        <section>
          <Title info={albarformData} />;
        </section>
        <section>
          <Content description={albarformData.description} />
        </section>
        <section>{/* <ApplicantInfo /> */}</section>
        <section>
          <MyApplication info={myApplicationData} />
        </section>
      </div>
    </>
  );
};

export default MyApplyPage;
