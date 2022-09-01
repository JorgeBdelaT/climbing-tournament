import { CreateFormInput, CreateTournamentStep } from "@/types/tournament";

export const createTournamentValidators = (
  step: CreateTournamentStep,
  values: CreateFormInput
) => {
  switch (step) {
    case 0:
      const { name, startDate, endDate, location, organization } = values;
      return {
        name:
          !name || name.trim().length < 2
            ? "Name must include at least 2 characters"
            : null,
        startDate: !startDate ? "Start date is required" : null,
        endDate: !endDate ? "End date is required" : null,
        location: !location ? "Location is required" : null,
        organization: !organization ? "Organization is required" : null,
      };
    case 1:
      return {};
    case 2:
      return {};
    default:
      return {};
  }
};
