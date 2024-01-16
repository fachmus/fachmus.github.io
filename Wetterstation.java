import.java.util.ArrayList;
import java.swing.JFrame;
import java.swing.JTextField;

public class Wetterstation{
    
    
private ArrayList<> observers = ArrayList<Observer>();
private int temperatur = null;
private int minTemperatur = null;
private int maxTemperatur = null;
private int luftfeuchtigkeit = null;

public static void main (String[] args) {
private WetterstationBraunschweig = new Wetterstation("Braunschweig");
}
public Wetterstation(String Place) {
this.addObserver(new Monitor(Place));
    }
    private void init() {

    }
    public void addObserver(Observer Observer) {
        observers.add(Observer);
    }

}