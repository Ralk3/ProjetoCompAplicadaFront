import React,{ useEffect, useState } from "react";
import{Button} from "@/components/ui/button";
import{Card, CardContent} from "@/components/ui/card";
import{inpu} from "@/components/ui/input";

import{
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
}from "@/components/ui/select";

import{
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
}from "@/components/ui/dialog";
import{motion}from "framer-motion";

export default function Payments(){
  const [payments, setPayments]=useState([]);
  const [open, setOpen]=useState(false);
  const [newPayment, setNewPayment]=useState({
    name:"",
    value:"",
    method:"Pix",
  });
}
const [loading, setLoading]= useState(falsse);
const API_URL = "http://localhost:3000/payments";
