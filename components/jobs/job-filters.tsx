"use client";

import { type ChangeEvent, useCallback, useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { createListCollection, Input, Stack } from "@chakra-ui/react";
import { debounce } from "lodash";

import { Field } from "../ui/field";
import { InputGroup } from "../ui/input-group";
import { SelectContent, SelectItem } from "../ui/select";
import { SelectRoot, SelectTrigger, SelectValueText } from "../ui/select";
import useParams from "@/hooks/useParams";
import { useJobStore } from "@/lib/store";

interface JobFiltersProps {
  onFilterChange: (filters: {
    category: string;
    search: string;
    location: string;
  }) => void;
}

export function JobFilters({ onFilterChange }: JobFiltersProps) {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState<string[]>([]);
  const [category, setCategory] = useState<string[]>([]);

  const { categories } = useJobStore();
  const { updateParams } = useParams();

  const CATEGORIES = createListCollection({
    items: categories
      ? categories.map((item, index) => ({
          label: item.name,
          value: item.slug,
        }))
      : [],
  });

  const LOCATIONS = createListCollection({
    items: [
      { label: "Worldwide", value: "Worldwide" },
      { label: "USA Only", value: "USA Only" },
      { label: "Europe", value: "Europe" },
      { label: "UK", value: "UK" },
      { label: "Canada", value: "Canada" },
      { label: "Australia", value: "Australia" },
    ],
  });

  // Memoized debounce function
  const handleSearchChange = useCallback(
    debounce((value: string) => {
      setSearch(value);
      updateParams({ search: value });
    }, 300),
    []
  );

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    setSearch(value); // Immediate state update for controlled input
    handleSearchChange(value); // Debounced update
  }

  function handleClearInput() {
    setSearch("");
    updateParams({ search: "" });
  }

  // Debounced filter change effect
  const debouncedFilterChange = useCallback(
    debounce(() => {
      onFilterChange({
        category: category[0],
        search,
        location: location[0] === "Worldwide" ? "" : location[0],
      });
    }, 300),
    [search, location, onFilterChange]
  );

  useEffect(() => {
    debouncedFilterChange();
    return () => debouncedFilterChange.cancel(); // Cleanup on unmount
  }, [search, location, debouncedFilterChange]);

  return (
    <div className="space-y-4 bg-card p-6 rounded-lg shadow-sm">
      <Stack colorPalette="primary" gap={4} width="full">
        <Field label="Search Jobs" width="full">
          <InputGroup
            flex="1"
            startElement={<Search size={12} className="text-muted-foreground" />} // prettier-ignore
            endElement={search && <X size="16px" onClick={handleClearInput} />} // prettier-ignore
            width="full"
          >
            <Input
              id="search"
              className="input"
              onChange={handleInputChange}
              placeholder="Search by title or company..."
              value={search}
            />
          </InputGroup>
        </Field>

        <Field label="Location" width="full">
          <SelectRoot
            className="select"
            collection={LOCATIONS}
            onValueChange={({ value }) => {
              setLocation(value);
              updateParams({ location: value[0] });
            }}
            value={location}
          >
            <SelectTrigger clearable>
              <SelectValueText pl={3} placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              {LOCATIONS.items.map((location) => (
                <SelectItem item={location} key={location.value}>
                  {location.label}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
        </Field>

        <Field label="Categories" width="full">
          <SelectRoot
            className="select"
            collection={CATEGORIES}
            onValueChange={({ value }) => {
              setCategory(value);
              updateParams({ category: value[0] });
            }}
            value={category}
          >
            <SelectTrigger clearable>
              <SelectValueText pl={3} placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.items.map((category) => (
                <SelectItem item={category} key={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
        </Field>
      </Stack>
    </div>
  );
}
