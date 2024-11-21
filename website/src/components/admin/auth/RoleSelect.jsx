import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/Command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/Popover";
import { useState } from "react";
import { roles } from "@/constants/roles";

export function RoleSelect({ role, onSetSelectedRole }) {
    const [open, setOpen] = useState(false);

    return (
        <Popover open={ open } onOpenChange={ setOpen }>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={ open }
                    className="w-[200px] justify-between"
                >
                    { role
                        ? roles.find((framework) => framework.value === role)?.label
                        : "Chọn quyền" }
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search framework..." />
                    <CommandList>
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                            { roles.map((framework) => (
                                <CommandItem
                                    key={ framework.value }
                                    value={ framework.value }
                                    onSelect={ (currentValue) => {
                                        onSetSelectedRole(currentValue === role ? "" : currentValue);
                                        setOpen(false);
                                    } }
                                >
                                    <Check
                                        className={ cn(
                                            "mr-2 h-4 w-4",
                                            role === framework.value ? "opacity-100" : "opacity-0"
                                        ) }
                                    />
                                    { framework.label }
                                </CommandItem>
                            )) }
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
