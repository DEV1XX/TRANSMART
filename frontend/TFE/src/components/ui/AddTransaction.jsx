"use client";

import * as React from "react";
import { useForm, Controller } from "react-hook-form";
// import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

// import {useDispatch} from 'react-redux'
// import { addTransaction, setTransactionLoading } from "../../Redux/Slices/TransactionSlice";


const AddTransaction = () => {
  // const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Transaction Data:", data);
    // dispatch(setTransactionLoading(true));
    try {
      const response = await fetch('http://localhost:5000/api/transactions',{
        method:'POST',
        headers:{
          "Content-Type": "application/json"
        },
        credentials:'include',
        body:JSON.stringify(data)
      });
  
      const responsedata = await response.json();
      console.log(responsedata);
      if(response.ok){
        // dispatch(addTransaction(responsedata.transaction));
        reset();
      }else{
        console.log("Failed to add transaction",responsedata.message);
      }
    } catch (error) {
      console.log("Error adding transaction:",error);
    }finally{
      // dispatch(setTransactionLoading(false));
    }
  };

  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <span className="flex justify-center items-center fixed bottom-[1vw] right-[1vw] m-3 material-symbols-outlined text-[40px] h-[60px] w-[60px] bg-rose-600 hover:scale-110 rounded-full">
            add
          </span>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="md:text-3xl text-2xl mt-10">Add Transaction</SheetTitle>
            <SheetDescription />
          </SheetHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-5 gap-6">
            <h1>Amount:</h1>
            <Input
              type="number"
              placeholder="e.g Rs.1000"
              className="text-sm md:h-[5vh]"
              {...register("amount", { required: "Amount is required" })}
            />
            {errors.amount && <p className="text-red-500">{errors.amount.message}</p>}
            <br />

            <h1>Select a date:</h1>
            {/* <DatePickerDemo control={control} /> */}
            <input 
              type="Date"
              id="date"
              // placeholder="Enter a date."
              defaultValue = {new Date().toISOString().split('T')[0]}
              className="bg-transparent w-full border-2 boredr-white h-[5vh]"
              {...register("date",{required:"*Date is required !"})}
              />
            {errors.date && <p className="text-red-500">{errors.date.message}</p>}
            <br />

            <h1 className="md:mt-5">Category:</h1>
            <select
              {...register("category", { required: "Category is required" })}
              className="bg-transparent w-full h-[5vh] border-2 border-white-200 rounded-md"
            >
              <option value="">Select a category</option>
              <option value="Food">Food</option>
              <option value="Travel">Travel</option>
            </select>
            {errors.category && <p className="text-red-500">{errors.category.message}</p>}

            <h1 className="mt-3 md:mt-10">Payment Method:</h1>
            <Controller
              name="paymentMethod"
              control={control}
              rules={{ required: "Payment method is required" }}
              render={({ field }) => (
                <RadioGroup {...field}>
                  {['Cash', 'Credit Card', 'Debit Card', 'Bank Transfer'].map((method) => (
                    <div key={method} className="flex items-center space-x-2">
                      <RadioGroupItem value={method} id={method} />
                      <Label htmlFor={method}>{method}</Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
            />
            {errors.paymentMethod && <p className="text-red-500">{errors.paymentMethod.message}</p>}

            <h1 className="mt-5">Description:</h1>
            <textarea
              placeholder="Write something......."
              className="w-full h-[10vh] bg-transparent border-2 border-white-200"
              {...register("description")}
            />

            <Button
              type="submit"
              variant="secondary"
              className="bg-rose-600 text-sm md:text-xl md:h-[5vh] w-full mt-5 hover:scale-110"
            >
              Add Transaction
            </Button>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AddTransaction;