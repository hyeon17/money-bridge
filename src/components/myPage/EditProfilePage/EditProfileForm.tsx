"use client";
import { v4 as uuidv4 } from "uuid";
import { IEditProfileFormProps } from "@/types/my";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import ProfileInput from "./formSections/ProfileInput";
import CompanyInput from "./formSections/CompanyInput";
import CareerInput from "./formSections/CareerInput";
import CareersInput from "./formSections/CareersInput";
import AwardsInput from "./formSections/AwardsInput";
import SpecialityInput from "./formSections/SpecialityInput";
import FigureInput from "./formSections/FigureInput";
import PortfolioInput from "./formSections/PortfolioInput";
import IntroInput from "./formSections/IntroInput";
import MsgInput from "./formSections/MsgInput";
import { convertEditFormData } from "@/utils/convertEditFormData";
import { useEditProfile } from "@/hooks/useEditProfile";

function EditProfileForm({ existingProfile }: IEditProfileFormProps) {
  const { mutate: editProfile, isLoading } = useEditProfile();
  const [filePreviews, setFilePreviews] = useState({
    profile: (existingProfile.profile as string).split("_")[1],
    portfolio: existingProfile.portfolio && (existingProfile.portfolio as string).split("_")[1],
  });
  const [files, setFiles] = useState<{ [key: string]: File | null }>({
    profile: null,
    portfolio: null,
  });
  const [careers, setCareers] = useState(
    existingProfile.careers.map(career => {
      return { ...career, id: uuidv4() };
    }),
  );

  const [awards, setAwards] = useState(
    existingProfile.awards.map(award => {
      return { ...award, id: uuidv4() };
    }),
  );
  const [speciality, setSpeciality] = useState(
    [existingProfile.speciality1, existingProfile.speciality2].filter(item => item !== null),
  );
  const methods = useForm<any>({
    mode: "onChange",
    defaultValues: {
      intro: existingProfile.intro,
      msg: existingProfile.msg,
      profile: existingProfile.profile,
      portfolio: existingProfile.portfolio,
      company: existingProfile.company,
      companyId: existingProfile.companyId,
      branchName: existingProfile.branchName,
      profitFactor: existingProfile.profitFactor,
      maxDrawdown: existingProfile.maxDrawdown,
      cumulativeReturn: existingProfile.cumulativeReturn,
      averageProfit: existingProfile.averageProfit,
      career: existingProfile.career,
    },
  });
  const {
    watch,
    setValue,
    unregister,
    reset,
    handleSubmit,
    formState: { isValid },
  } = methods;

  const profileVal = watch("profile");
  const portfolioVal = watch("portfolio");

  const addCareers = () => {
    setCareers([...careers, { id: uuidv4(), career: undefined, start: undefined, end: undefined }]);
  };

  const addAwards = () => {
    setAwards([...awards, { id: uuidv4(), record: undefined, year: undefined }]);
  };

  const removeItems = (type: string, nowId: string) => {
    const array = type === "career" ? ([...careers] as []) : ([...awards] as []);
    const sortedArr = array.filter(({ id }) => id !== nowId);

    if (type === "career") {
      setCareers(sortedArr);
      unregister(`careers-${nowId}-career`);
      unregister(`careers-${nowId}-start`);
      unregister(`careers-${nowId}-end`);
      return;
    }
    setAwards(sortedArr);
    unregister(`award-${nowId}-record`);
    unregister(`award-${nowId}-year`);
    return;
  };

  const removeFile = (type: string) => {
    type === "profile" ? setValue("profile", "") : setValue("portfolio", "");
  };

  const handleToggleButtons = (id: string) => {
    if (speciality.includes(id)) {
      setSpeciality(speciality.filter(item => item !== id));
      return;
    }
    if (speciality.length === 2) return;
    setSpeciality([...speciality, id]);
  };

  const onSubmit = (data: { [key: string]: unknown }) => {
    const formData = convertEditFormData(data, speciality, files);
    editProfile(formData);
    reset();
  };

  useEffect(() => {
    if (profileVal && !(typeof profileVal === "string")) {
      const file = profileVal[0] as File;
      setFilePreviews({ ...filePreviews, profile: file.name });
      setFiles({ ...files, profile: file });
      return;
    }
    if (portfolioVal && !(typeof portfolioVal === "string")) {
      const file = portfolioVal[0] as File;
      setFilePreviews({ ...filePreviews, portfolio: file.name });
      setFiles({ ...files, portfolio: file });
      return;
    }
    if (!profileVal) {
      setFilePreviews({ ...filePreviews, profile: "" });
      setFiles({ ...files, profile: null });
      return;
    }
    if (!portfolioVal) {
      setFilePreviews({ ...filePreviews, portfolio: "" });
      setFiles({ ...files, portfolio: null });
    }
  }, [profileVal, portfolioVal]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="pb-20">
        <ProfileInput removeFile={removeFile} profile={filePreviews.profile} />
        <CompanyInput />
        <CareerInput />
        <CareersInput removeItems={removeItems} careers={careers} addCareers={addCareers} />
        <AwardsInput removeItems={removeItems} awards={awards} addAwards={addAwards} />
        <SpecialityInput speciality={speciality} handleToggleButtons={handleToggleButtons} />
        <FigureInput />
        <PortfolioInput removeFile={removeFile} portfolio={filePreviews.portfolio} />
        <IntroInput />
        <MsgInput />
        <button
          disabled={!isValid || isLoading}
          className={`button_fixed ${(!isValid || isLoading) && "bg-button-inactive"}`}
        >
          등록 완료
        </button>
      </form>
    </FormProvider>
  );
}

export default EditProfileForm;
