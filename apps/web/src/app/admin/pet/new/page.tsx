import PetAddForm from "./pet-add-form";

const AddPetPage = () => {
  return (
    <>
      <p className="text-center pb-4">Adicionar Novo Pet</p>
      <div className="rounded-lg bg-white p-6 space-y-6">
        <h1 className="text-3xl font-bold text-center">Cadastrar Pet</h1>
        <PetAddForm />
      </div>
    </>
  );
};

export default AddPetPage;
