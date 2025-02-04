"use client";

import { useRef, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { DialogDescription, Input, Stack, Textarea } from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FileUp, Mail, User } from "lucide-react";

import { saveFormSubmission } from "@/app/actions";
import { Button } from "../ui/button";
import { CloseButton } from "../ui/close-button";
import { DialogBody, DialogContent } from "../ui/dialog";
import { DialogCloseTrigger, DialogHeader } from "../ui/dialog";
import { DialogRoot, DialogTitle } from "../ui/dialog";
import { Field } from "../ui/field";
import { FileInput, FileUploadClearTrigger } from "../ui/file-upload";
import { FileUploadRoot } from "../ui/file-upload";
import { InputGroup } from "../ui/input-group";
import { useGlobalToast } from "@/hooks/useGlobalToast";
import { Job } from "@/types/jobs";

const formSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  resume: z.any().refine((file) => file instanceof File, { message: "Please upload a valid Resume" }), // prettier-ignore
  coverLetter: z.string().min(10, "Cover letter must be at least 10 characters"), // prettier-ignore
});

const acceptedFiles = [
  "image/jpg",
  "image/png",
  "application/pdf",
  "application/msword",
];

interface ApplicationFormProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  job: Job;
}

export function ApplicationForm({ job, open, setOpen }: ApplicationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const { showToast } = useGlobalToast();

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      resume: undefined,
      coverLetter: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const formData = new FormData();

      formData.set("fullName", values.fullName);
      formData.set("email", values.email);
      formData.set("resume", values.resume);
      formData.set("coverLetter", values.coverLetter);

      console.log("Form submission received:", values);

      // Simulate API call
      const response = await saveFormSubmission(formData);

      if (response.success) {
        reset();
        showToast({
          title: "Success",
          type: "success",
          description: "Your message has been sent successfully.",
        });
        setOpen(false);
      }
    } catch (error) {
      showToast({
        title: "Error",
        type: "error",
        description: "Failed to submit application. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <DialogRoot
      initialFocusEl={() => inputRef.current}
      lazyMount
      motionPreset="slide-in-bottom"
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      scrollBehavior="inside"
      size={{ base: "xs", md: "sm", lg: "md" }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogCloseTrigger />

        <DialogHeader>
          <DialogTitle fontSize="lg" fontWeight="bold">
            Apply
          </DialogTitle>
          <DialogDescription>{job?.title}</DialogDescription>
        </DialogHeader>

        <DialogBody>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
            <Stack colorPalette="primary" gap={6} width="full">
              <Field
                label="Full Name"
                invalid={!!errors.fullName}
                errorText={errors.fullName?.message}
                width="full"
              >
                <Controller
                  name="fullName"
                  control={control}
                  render={({ field }) => (
                    <InputGroup
                      flex="1"
                      startElement={<User size={14} />}
                      width="full"
                    >
                      <Input
                        className="input"
                        placeholder="Enter your full name"
                        {...field}
                        ref={inputRef}
                      />
                    </InputGroup>
                  )}
                />
              </Field>

              <Field
                label="Email"
                invalid={!!errors.email}
                errorText={errors.email?.message}
                width="full"
              >
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <InputGroup
                      flex="1"
                      startElement={<Mail size={14} />}
                      width="full"
                    >
                      <Input
                        className="input"
                        placeholder="Enter your email"
                        {...field}
                      />
                    </InputGroup>
                  )}
                />
              </Field>

              <Field
                label="Upload Resume"
                invalid={!!errors.resume}
                errorText={errors.resume?.message}
                width="full"
              >
                <Controller
                  name="resume"
                  control={control}
                  render={({ field }) => (
                    <FileUploadRoot
                      accept={acceptedFiles}
                      gap="1"
                      name={field.name}
                      onFileChange={({ acceptedFiles }) => field.onChange(acceptedFiles[0])} // prettier-ignore
                    >
                      <InputGroup
                        w="full"
                        startElement={<FileUp size={14} />}
                        endElement={
                          <FileUploadClearTrigger asChild>
                            <CloseButton
                              me="-1"
                              size="xs"
                              variant="plain"
                              focusVisibleRing="inside"
                              focusRingWidth="2px"
                              pointerEvents="auto"
                              color="fg.subtle"
                            />
                          </FileUploadClearTrigger>
                        }
                      >
                        <FileInput className="file-input" />
                      </InputGroup>
                    </FileUploadRoot>
                  )}
                />
              </Field>

              <Field
                label="Cover Letter"
                invalid={!!errors.coverLetter}
                errorText={errors.coverLetter?.message}
                width="full"
              >
                <Controller
                  name="coverLetter"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      className="textarea"
                      placeholder="Write a short cover letter"
                      size="xl"
                      {...field}
                    />
                  )}
                />
              </Field>

              <Button
                bg="colorPalette.solid"
                className="btn text-white"
                disabled={isSubmitting}
                loading={isSubmitting}
                loadingText="Submitting"
                type="submit"
                _hover={{ bg: "colorPalette.600" }}
              >
                <span>Submit</span>
              </Button>
            </Stack>
          </form>
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
}
