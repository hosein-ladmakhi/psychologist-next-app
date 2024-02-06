import Modal from "@/components/Modal";
import { TCreateTicketDialogFC, TCreateTicketFormValidation } from "./index.type";
import TextInput from "@/components/TextInput";
import { useForm } from "react-hook-form";
import Button from "@/components/Button";
import FlexBox from "@/components/FlexBox";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTicketFormValidation } from "./index.constant";
import { useRef, useTransition } from "react";
import { useConfirm } from "material-ui-confirm";
import { errorNotify, successNotify } from "@/utils/notify";
import { createTicketAction } from "@/app/(patient)/patient/my-tickets/actions";

const CreateTicketDialog: TCreateTicketDialogFC = ({ handleClose, selectedTicket }) => {
  const { control, handleSubmit } = useForm<TCreateTicketFormValidation>({ resolver: zodResolver(createTicketFormValidation) });
  const confirmation = useConfirm();
  const attachmentsRef = useRef<HTMLInputElement>(null);
  const [loading, handleTransition] = useTransition();

  const handleAttachmentsExplorer = () => {
    attachmentsRef?.current?.click();
  };

  const handleCreateTicket = (data: TCreateTicketFormValidation) => {
    handleTransition(async () => {
      const formdata = new FormData();
      formdata.append("title", data.title);
      formdata.append("content", data.content);
      if (selectedTicket) {
        formdata.append("parent", selectedTicket?.id as any);
      }
      if (attachmentsRef.current?.files && attachmentsRef.current?.files?.length > 0) {
        Array.from(attachmentsRef.current?.files).map((file) => formdata.append("attachments", file as any));
      }
      const res = await createTicketAction(formdata);
      if (res) successNotify("Your ticket saved successfully, please wait for response");
      else errorNotify("Something went wrong in saving ticket, please try again");
      handleClose();
    });
  };

  const onSubmit = handleSubmit((data) => {
    if (attachmentsRef?.current?.files && attachmentsRef?.current?.files?.length > 0) {
      handleCreateTicket(data);
    } else {
      confirmation({
        title: "You don't need any attachments?",
        cancellationText: "No i don't need",
        confirmationText: "Yes i need, so cancel it",
      })
        .then(() => {
          errorNotify("So, please select your attachments and try again");
        })
        .catch(() => {
          handleCreateTicket(data);
        });
    }
  });

  return (
    <Modal handleClose={handleClose} title="Create Ticket" opened size="xl">
      <form onSubmit={onSubmit}>
        <TextInput control={control} label="Title" name="title" type="text" />
        <TextInput control={control} label="Content" name="content" rows={10} multiline />
        <input type="file" hidden ref={attachmentsRef} />
        <FlexBox gap={1} justifyContent="flex-end" mt={1}>
          <Button color="warning" onClick={handleAttachmentsExplorer}>
            Add Attachments
          </Button>
          <Button loading={loading} type="submit" color="success">
            Create Ticket
          </Button>
        </FlexBox>
      </form>
    </Modal>
  );
};

export default CreateTicketDialog;
