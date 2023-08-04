// Faça um algoritmo para ler: a quantidade adquirida de um produto e seu preço unitário. O algoritmo deve calcular e escrever:
// o total : (total = quantidade adquirida * preço unitário);
// o desconto: (desconto = total*(<valor>/100));
// e o total a pagar : (total a pagar = total – desconto);
// Se quantidade <= 5 o desconto será de 2%  (desconto=total*(2/100)) || Se quantidade > 5 e quantidade <=10 o desconto será de 3% || Se quantidade > 10 o desconto será de 5%;
import java.util.Scanner;

public class main{
    public static void main(String[] args){
        double priceBeforeDisc, ammountBought;
        double buyerTotal, discount, finalPrice;
        Scanner read = new Scanner(System.in);
        
        System.out.println("Input the amount you bought: ");
        ammountBought = read.nextDouble();
        
        System.out.println("Input the unit price: ");
        priceBeforeDisc = read.nextDouble();
        buyerTotal = priceBeforeDisc * ammountBought;
        
        if(ammountBought<=5){
            discount = 0.02;
            finalPrice = buyerTotal -(buyerTotal*discount);
            System.out.println("Your total is: "+buyerTotal+" you got a discount of 2%, and your final price is: "+finalPrice);
        }else if(ammountBought>5 && ammountBought<=10){
            discount = 0.03;
            finalPrice = buyerTotal -(buyerTotal*discount);
            System.out.println("Your total is: "+buyerTotal+" you got a discount of 3%, and your final price is: "+finalPrice);
        }else{
            discount = 0.05;
            finalPrice = buyerTotal -(buyerTotal*discount);
            System.out.println("Your total is: "+buyerTotal+" you got a discount of 5%, and your final price is: "+finalPrice);
        }
    }
}