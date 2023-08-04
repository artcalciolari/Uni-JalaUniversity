public class Main {
    public static void main(String[] args) {
        try{
            System.out.println("Welcome. Please wait while the program is loaded...");
            Thread.sleep(1000);

            MySet mySet = new MySet();
            String finalList = mySet.addToList();

            System.out.println("The final list is: "+finalList);
        } catch (Exception e) {
            System.out.println("Something went wrong. Please, try again.");
        }
    }
}
