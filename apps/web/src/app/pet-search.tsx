import ClearInput from "@/components/ui/clean-input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Pet } from "@/types/pet";
import { Age, petAgeDict, sexDict } from "@/utils/dict";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  useAge,
  useBreed,
  useName,
  usePage,
  useSex,
  useSpecie,
} from "./nuqs-state";
import PetAgeSelect from "./pet-age-select";
import BreedSelect from "./pet-breed-select";
import PetSpecieSelect from "./pet-specie-select";
import PetSexSelect from "./pet-sex-select";

const formSchema = z.object({
  name: z.string().optional(),
  specie: z.string().optional(),
  breed: z.string().optional(),
  sex: z.enum(Object.keys(sexDict) as [Pet["sex"], ...Pet["sex"][]]).optional(),
  age: z.enum(Object.keys(petAgeDict.Gato) as [Age, ...Age[]]).optional(),
});

const PetSearch = () => {
  const [_page, setPage] = usePage();
  const [name, setName] = useName();
  const [specie, setSpecie] = useSpecie();
  const [breed, setBreed] = useBreed();
  const [sex, setSex] = useSex();
  const [age, setAge] = useAge();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name, specie, breed },
  });

  return (
    <Form {...form}>
      <form className="space-y-4">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <ClearInput
                  {...field}
                  value={name}
                  onChange={(e) => {
                    setPage(1);
                    setName(e.target.value);
                  }}
                  autoComplete="n"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <PetSpecieSelect
          specie={specie}
          setSpecie={(specie) => {
            setPage(1);
            setSpecie(specie);
            setBreed("");
          }}
        />

        <BreedSelect
          specie={specie}
          breed={breed}
          setBreed={(breed) => {
            setPage(1);
            setBreed(breed);
          }}
        />

        <PetSexSelect
          sex={sex}
          setSex={(sex) => {
            setPage(1);
            setSex(sex);
          }}
        />

        <PetAgeSelect
          specie={specie}
          age={age}
          setAge={(age) => {
            setPage(1);
            setAge(age);
          }}
        />
      </form>
    </Form>
  );
};

export default PetSearch;
