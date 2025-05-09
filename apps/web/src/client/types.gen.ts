// This file is auto-generated by @hey-api/openapi-ts

export type GetPetPetsData = {
  body?: never;
  path?: never;
  query: {
    page: string | number;
    pageSize: string | number;
    name?: string;
    sex?: "MALE" | "FEMALE" | "UNKNOWN";
    breedId?: string;
    specieId?: string;
    minBirthdate?: string;
    maxBirthdate?: string;
  };
  url: "/pet/pets";
};

export type GetPetPetsErrors = {
  /**
   * Validation Error
   */
  422: unknown;
};

export type GetPetPetsResponses = {
  /**
   * Success
   */
  200: {
    pets: Array<
      {
        id: string;
        name: string;
        birthdate: string;
        observations: string | null;
        sex: "MALE" | "FEMALE" | "UNKNOWN";
        mainImageId: string | null;
        breedId: string;
        specieId: string;
      } & {
        images: Array<{
          id: string;
          src: string;
        }>;
        breed: {
          id: string;
          name: string;
          specieId: string;
        };
        specie: {
          id: string;
          name: string;
        };
      }
    >;
    /**
     * Total number of pets in the database
     */
    total: number;
  };
};

export type GetPetPetsResponse = GetPetPetsResponses[keyof GetPetPetsResponses];

export type PostPetPetsData = {
  body: {
    name: string;
    birthdate: string;
    observations?: string;
    sex: "MALE" | "FEMALE" | "UNKNOWN";
    mainImageId?: string;
    breedId: string;
    specieId: string;
  };
  path?: never;
  query?: never;
  url: "/pet/pets";
};

export type PostPetPetsErrors = {
  /**
   * Bad Request
   */
  400:
    | {
        name: "SpecieNotFoundError";
        message: "Specie not found";
      }
    | {
        name: "BreedNotFoundError";
        message: "Breed not found";
      }
    | {
        name: "InvalidBreedSpecieError";
        message: "Breed does not belong to the specified specie";
      };
  /**
   * Unauthorized
   */
  401: {
    name: "Unauthorized";
    message: "Unauthorized";
  };
  /**
   * Validation Error
   */
  422: unknown;
};

export type PostPetPetsError = PostPetPetsErrors[keyof PostPetPetsErrors];

export type PostPetPetsResponses = {
  /**
   * Success
   */
  200: {
    id: string;
    name: string;
    birthdate: string;
    observations: string | null;
    sex: "MALE" | "FEMALE" | "UNKNOWN";
    mainImageId: string | null;
    breedId: string;
    specieId: string;
  } & {
    images: Array<{
      id: string;
      src: string;
    }>;
    breed: {
      id: string;
      name: string;
      specieId: string;
    };
    specie: {
      id: string;
      name: string;
    };
  };
};

export type PostPetPetsResponse =
  PostPetPetsResponses[keyof PostPetPetsResponses];

export type GetPetPetsByIdData = {
  body?: never;
  path: {
    id: string;
  };
  query?: never;
  url: "/pet/pets/{id}";
};

export type GetPetPetsByIdErrors = {
  /**
   * Pet not found
   */
  404: {
    name: "PetNotFoundError";
    message: "Pet not found";
  };
  /**
   * Validation Error
   */
  422: unknown;
};

export type GetPetPetsByIdError =
  GetPetPetsByIdErrors[keyof GetPetPetsByIdErrors];

export type GetPetPetsByIdResponses = {
  /**
   * Success
   */
  200: {
    id: string;
    name: string;
    birthdate: string;
    observations: string | null;
    sex: "MALE" | "FEMALE" | "UNKNOWN";
    mainImageId: string | null;
    breedId: string;
    specieId: string;
  } & {
    images: Array<{
      id: string;
      src: string;
    }>;
    breed: {
      id: string;
      name: string;
      specieId: string;
    };
    specie: {
      id: string;
      name: string;
    };
  };
};

export type GetPetPetsByIdResponse =
  GetPetPetsByIdResponses[keyof GetPetPetsByIdResponses];

export type PostPetPetsByIdImagesData = {
  body: {
    image: Blob | File;
  };
  path: {
    id: string;
  };
  query?: never;
  url: "/pet/pets/{id}/images";
};

export type PostPetPetsByIdImagesErrors = {
  /**
   * Unauthorized
   */
  401: {
    name: "Unauthorized";
    message: "Unauthorized";
  };
  /**
   * Pet not found
   */
  404: {
    name: "PetNotFoundError";
    message: "Pet not found";
  };
  /**
   * Validation Error
   */
  422: unknown;
};

export type PostPetPetsByIdImagesError =
  PostPetPetsByIdImagesErrors[keyof PostPetPetsByIdImagesErrors];

export type PostPetPetsByIdImagesResponses = {
  /**
   * Success
   */
  201: {
    id: string;
    src: string;
    ownerId: string;
    ownerType: string;
  };
};

export type PostPetPetsByIdImagesResponse =
  PostPetPetsByIdImagesResponses[keyof PostPetPetsByIdImagesResponses];

export type PostPetBreedsData = {
  body: {
    name: string;
    specieId: string;
  };
  path?: never;
  query?: never;
  url: "/pet/breeds";
};

export type PostPetBreedsErrors = {
  /**
   * Specie not found
   */
  400: {
    name: "SpecieNotFoundError";
    message: "Specie not found";
  };
  /**
   * Unauthorized
   */
  401: {
    name: "Unauthorized";
    message: "Unauthorized";
  };
  /**
   * Breed already exists
   */
  409: {
    name: "BreedAlreadyExistsError";
    message: "Breed already exists";
  };
  /**
   * Validation error
   */
  422: unknown;
};

export type PostPetBreedsError = PostPetBreedsErrors[keyof PostPetBreedsErrors];

export type PostPetBreedsResponses = {
  /**
   * Success
   */
  201: {
    id: string;
    name: string;
    specieId: string;
  };
};

export type PostPetBreedsResponse =
  PostPetBreedsResponses[keyof PostPetBreedsResponses];

export type PutPetBreedsData = {
  body: {
    id: string;
    name: string;
    specieId: string;
  };
  path?: never;
  query?: never;
  url: "/pet/breeds";
};

export type PutPetBreedsErrors = {
  /**
   * Specie not found
   */
  400: {
    name: "BreedNotFoundError";
    message: "Breed not found";
  };
  /**
   * Unauthorized
   */
  401: {
    name: "Unauthorized";
    message: "Unauthorized";
  };
  /**
   * Breed not found
   */
  404: {
    name: "SpecieNotFoundError";
    message: "Specie not found";
  };
  /**
   * Validation error
   */
  422: unknown;
};

export type PutPetBreedsError = PutPetBreedsErrors[keyof PutPetBreedsErrors];

export type PutPetBreedsResponses = {
  /**
   * Success
   */
  200: {
    id: string;
    name: string;
    specieId: string;
  };
};

export type PutPetBreedsResponse =
  PutPetBreedsResponses[keyof PutPetBreedsResponses];

export type GetPetSpeciesByIdBreedsData = {
  body?: never;
  path: {
    id: string;
  };
  query?: never;
  url: "/pet/species/{id}/breeds";
};

export type GetPetSpeciesByIdBreedsErrors = {
  /**
   * Specie not found
   */
  400: {
    name: "SpecieNotFoundError";
    message: "Specie not found";
  };
  /**
   * Validation error
   */
  422: unknown;
};

export type GetPetSpeciesByIdBreedsError =
  GetPetSpeciesByIdBreedsErrors[keyof GetPetSpeciesByIdBreedsErrors];

export type GetPetSpeciesByIdBreedsResponses = {
  /**
   * Success
   */
  200: Array<{
    id: string;
    name: string;
    specieId: string;
  }>;
};

export type GetPetSpeciesByIdBreedsResponse =
  GetPetSpeciesByIdBreedsResponses[keyof GetPetSpeciesByIdBreedsResponses];

export type GetPetSpeciesData = {
  body?: never;
  path?: never;
  query?: never;
  url: "/pet/species";
};

export type GetPetSpeciesResponses = {
  /**
   * Success
   */
  200: Array<{
    id: string;
    name: string;
  }>;
};

export type GetPetSpeciesResponse =
  GetPetSpeciesResponses[keyof GetPetSpeciesResponses];

export type PostPetSpeciesData = {
  body: {
    name: string;
  };
  path?: never;
  query?: never;
  url: "/pet/species";
};

export type PostPetSpeciesErrors = {
  /**
   * Unauthorized
   */
  401: {
    name: "Unauthorized";
    message: "Unauthorized";
  };
  /**
   * Specie already exists
   */
  409: {
    name: "SpecieNotFoundError";
    message: "Specie not found";
  };
  /**
   * Validation Error
   */
  422: unknown;
};

export type PostPetSpeciesError =
  PostPetSpeciesErrors[keyof PostPetSpeciesErrors];

export type PostPetSpeciesResponses = {
  /**
   * Created
   */
  201: {
    id: string;
    name: string;
  };
};

export type PostPetSpeciesResponse =
  PostPetSpeciesResponses[keyof PostPetSpeciesResponses];

export type PutPetSpeciesData = {
  body: {
    id: string;
    name: string;
  };
  path?: never;
  query?: never;
  url: "/pet/species";
};

export type PutPetSpeciesErrors = {
  /**
   * Unauthorized
   */
  401: {
    name: "Unauthorized";
    message: "Unauthorized";
  };
  /**
   * Specie not found
   */
  404: {
    name: "SpecieNotFoundError";
    message: "Specie not found";
  };
  /**
   * Validation Error
   */
  422: unknown;
};

export type PutPetSpeciesError = PutPetSpeciesErrors[keyof PutPetSpeciesErrors];

export type PutPetSpeciesResponses = {
  /**
   * Success
   */
  200: {
    id: string;
    name: string;
  };
};

export type PutPetSpeciesResponse =
  PutPetSpeciesResponses[keyof PutPetSpeciesResponses];

export type PostHealthPatientsData = {
  body: {
    name: string;
    birthdate: string;
    medicalObservations?: string;
    sex: "MALE" | "FEMALE" | "UNKNOWN";
    breed: string;
    specie: string;
  };
  path?: never;
  query?: never;
  url: "/health/patients";
};

export type PostHealthPatientsErrors = {
  /**
   * Unauthorized
   */
  401: {
    name: "Unauthorized";
    message: "Unauthorized";
  };
  /**
   * Validation Error
   */
  422: unknown;
};

export type PostHealthPatientsError =
  PostHealthPatientsErrors[keyof PostHealthPatientsErrors];

export type PostHealthPatientsResponses = {
  /**
   * Success
   */
  201: {
    id: string;
    name: string;
    birthdate: string;
    medicalObservations: string | null;
    sex: "MALE" | "FEMALE" | "UNKNOWN";
    breed: string;
    specie: string;
  };
};

export type PostHealthPatientsResponse =
  PostHealthPatientsResponses[keyof PostHealthPatientsResponses];

export type PostAuthUsersRegisterData = {
  body: {
    email: string;
    password: string;
    name: string;
    birthdate: string;
  };
  path?: never;
  query?: never;
  url: "/auth/users/register";
};

export type PostAuthUsersRegisterErrors = {
  /**
   * User already exists
   */
  409: {
    name: "UserAlreadyExistsError";
    message: "User already exists";
  };
  /**
   * Validation Error
   */
  422: unknown;
};

export type PostAuthUsersRegisterError =
  PostAuthUsersRegisterErrors[keyof PostAuthUsersRegisterErrors];

export type PostAuthUsersRegisterResponses = {
  /**
   * User successfully registered and token generated.
   */
  201: {
    user: {
      id: string;
      name: string;
      email: string;
      birthdate: string;
    };
    /**
     * The JWT authentication token.
     */
    token: string;
    /**
     * The expiration time of the token in seconds.
     */
    expiresIn: number;
  };
};

export type PostAuthUsersRegisterResponse =
  PostAuthUsersRegisterResponses[keyof PostAuthUsersRegisterResponses];

export type PostAuthUsersLoginData = {
  body: {
    email: string;
    password: string;
  };
  path?: never;
  query?: never;
  url: "/auth/users/login";
};

export type PostAuthUsersLoginErrors = {
  /**
   * Invalid credentials provided.
   */
  401: {
    name: "InvalidCredentialsError";
    message: "Invalid credentials";
  };
  /**
   * Validation Error
   */
  422: unknown;
};

export type PostAuthUsersLoginError =
  PostAuthUsersLoginErrors[keyof PostAuthUsersLoginErrors];

export type PostAuthUsersLoginResponses = {
  /**
   * Successful login and token generation.
   */
  200: {
    /**
     * The JWT authentication token.
     */
    token: string;
    /**
     * The expiration time of the token in seconds.
     */
    expiresIn: number;
  };
};

export type PostAuthUsersLoginResponse =
  PostAuthUsersLoginResponses[keyof PostAuthUsersLoginResponses];

export type PostAuthUsersLogoutData = {
  body?: never;
  path?: never;
  query?: never;
  url: "/auth/users/logout";
};

export type PostAuthUsersLogoutErrors = {
  /**
   * Unauthorized
   */
  401: {
    name: "Unauthorized";
    message: "Unauthorized";
  };
};

export type PostAuthUsersLogoutError =
  PostAuthUsersLogoutErrors[keyof PostAuthUsersLogoutErrors];

export type PostAuthUsersLogoutResponses = {
  /**
   * Success
   */
  204: void;
};

export type PostAuthUsersLogoutResponse =
  PostAuthUsersLogoutResponses[keyof PostAuthUsersLogoutResponses];

export type ClientOptions = {
  baseUrl: `${string}://swagger.json` | (string & {});
};
