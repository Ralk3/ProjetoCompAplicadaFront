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

onst fetchPayments= async() =>{
  try{
    setLoading(true);
    const res= await fetch(API_URL);
    if (!res.ok) throw new Error("Falha ao buscar pagamentos");
    const data= await res.json();
    setPayments(data);
  }catch (err){
    console.error(err);
  }finally{
    setLoading(false);
  }
};
useEffect(() => {
  fetchPayments();
}, []);

const handleCreatePayment = async () => {
  if (!newPayment.name || !newPayment.value) return;
  try {
    setLoading(true);
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPayment),
    });
    setOpen(false);
    setNewPayment({ name: "", value: "", method: "PIX" });
    await fetchPayments();
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

const uptdadeStatus= async(Id, Status)=>{
  try{
    setLoading(true);
    await fetch({API_URL}/{id}),{
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({Status}),
    };
    await fetchPayments();
  }catch (err){
    console.error(err);
  }finally{
    setLoading(false);
  }
};


const deletePayment = async (id) =>{
  if (!confirm("Deseja realmente excluir este pagamento?")) return;
try{
  setLoading(true);
  await fetch({$API_URL}/{id}, { method: "DELETE" });
  await fetchPayments();
} catch (err){
  console.error(err);
}finally{
  setLoading(false);
}
};
