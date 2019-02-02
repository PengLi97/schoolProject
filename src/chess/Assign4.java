/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package chess;

import java.util.List;
import javafx.application.Application;
import javafx.event.ActionEvent;
import javafx.event.EventHandler;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.layout.BorderPane;
import javafx.scene.layout.GridPane;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;
import javafx.collections.ListChangeListener;
/**
 *
 * @author Mr.Peng
 */
public class Assign4 extends Application {
    private ChessBoard board;
    
    @Override
    public void start(Stage primaryStage) {
        GridPane grid = new GridPane();
        BorderPane borderPane = new BorderPane();
        //Scene scene = new Scene(grid,900,720);
        Scene scene = new Scene(borderPane,900,720);
        VBox left = new VBox();
        VBox right = new VBox();
        grid.setPrefSize(720, 720);
        borderPane.setCenter(grid);
        borderPane.setLeft(left);
        borderPane.setRight(right);
        Button leftB[] = new Button[16];
        Button rightB[] = new Button[16];       
        Button btf[][] = new Button[8][8];
        board = new ChessBoard();
        SquareEventHandler go = new SquareEventHandler(board);
        for (int i = 0; i < 8; i++) {
            leftB[i] = new Button("");
            leftB[i].setMinSize(90, 90);
            //leftB[i].setStyle("-fx-background-color: grey;");
            rightB[i] = new Button("");
            rightB[i].setMinSize(90, 90);
            //rightB[i].setStyle("-fx-background-color: grey;");
            //leftB[i].setOnAction(go);
            //rightB[i].setOnAction(go);
            left.getChildren().add(leftB[i]);
            right.getChildren().add(rightB[i]);
        }
        for (int i = 0; i < 8; i++) {
            for(int j = 0; j < 8 ; j++){                
                btf[i][j] = new Button(""+ i+ " " + j);
                btf[i][j].setOnAction(go);
                if((i+j)%2==0){
                    btf[i][j].setStyle("-fx-background-color: grey;");
                }
                else{
                    btf[i][j].setStyle("-fx-background-color: white;");
                }
                grid.add(btf[i][j], i, j);
                btf[i][j].setMinSize(90, 90);
            }
        }
        Image icon;
        icon = new Image("black_rook.png");    
        btf[0][7].setGraphic(new ImageView(icon));
        btf[7][7].setGraphic(new ImageView(icon));
        
        icon = new Image("black_bishop.png"); 
        btf[2][7].setGraphic(new ImageView(icon));
        btf[5][7].setGraphic(new ImageView(icon));

        icon = new Image("black_knight.png"); 
        btf[1][7].setGraphic(new ImageView(icon));
        btf[6][7].setGraphic(new ImageView(icon));
        
        icon = new Image("black_queen.png"); 
        btf[3][7].setGraphic(new ImageView(icon));
        
        icon = new Image("black_king.png"); 
        btf[4][7].setGraphic(new ImageView(icon));
        
        icon = new Image("black_pawn.png"); 
        for(int i = 0; i < 8; i++){
            btf[i][6].setGraphic(new ImageView(icon));
        }
        
        icon = new Image("white_rook.png");    
        btf[0][0].setGraphic(new ImageView(icon));
        btf[7][0].setGraphic(new ImageView(icon));
        
        icon = new Image("white_bishop.png"); 
        btf[2][0].setGraphic(new ImageView(icon));
        btf[5][0].setGraphic(new ImageView(icon));

        icon = new Image("white_knight.png"); 
        btf[1][0].setGraphic(new ImageView(icon));
        btf[6][0].setGraphic(new ImageView(icon));
        
        icon = new Image("white_queen.png"); 
        btf[3][0].setGraphic(new ImageView(icon));
        
        icon = new Image("white_king.png"); 
        btf[4][0].setGraphic(new ImageView(icon));
        
        icon = new Image("white_pawn.png"); 
        for(int i = 0; i < 8; i++){
            btf[i][1].setGraphic(new ImageView(icon));
        }
               ListChangeListener listener;
        listener = new ListChangeListener() {
            @Override
            public void onChanged(ListChangeListener.Change c) {
                while(c.next()) {
                    if(c.wasAdded()) {
                        int index = c.getFrom();
                        List<Piece> p = c.getAddedSubList();
                        for (Piece pieces:p) {
                            Image takenPiece = new Image(pieces.getImageName());
                            if (pieces.getColour() == ChessColour.WHITE) {
                                for (Button leftB1 : leftB) {
                                    if (leftB1.getGraphic() == null) {
                                        leftB1.setGraphic(new ImageView(takenPiece));
                                        break;
                                    }
                                }
                            }
                            else {
                                for (Button rightB1 : rightB) {
                                    if (rightB1.getGraphic() == null) {
                                        rightB1.setGraphic(new ImageView(takenPiece));
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        };
       
       this.board.addTakenObserver(listener);
        
        
        primaryStage.setTitle("chessboard"); 
        primaryStage.setScene(scene);
        primaryStage.show();
    }

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        launch(args);
    }
    
}
class SquareEventHandler implements EventHandler<ActionEvent> {
    private ChessBoard board;
    private boolean firstClick;
    private Square firstSquare;
    private Square secondSquare;
    private Button firstButton;
    private Button secondButton;
    private Piece  now;
    public SquareEventHandler(ChessBoard o){
        this.board = o;
        this.firstClick = true;
        
        
    }
    @Override
    public void handle(ActionEvent event) {
        if (firstClick == true){
            firstButton = (Button) event.getSource();
            String a = firstButton.getText();
            String[] a1 = a.split(" ");
            Integer x = Integer.valueOf(a1[0]);
            Integer y = Integer.valueOf(a1[1]);          
            firstSquare = new Square(new Coordinate(x,y), board.getSquare(new Coordinate(x,y)).getPiece());
            now = board.getSquare(new Coordinate(x,y)).getPiece();
            firstClick = false;
            
            /******
             * personal check for piece
             * */
             System.out.println(board.getSquare(new Coordinate(x,y)).getPiece());
            System.out.println("first pos:[" + x + " " + y + "]");            
            System.out.println("column: "+ firstSquare.getColumnNumber()+ " row:" + firstSquare.getRowNumber() + "  " + board.getSquare(new Coordinate(x,y)).getPiece().getImageName());
            System.out.println("-------------------------------------------------");
            //
            
                     
        }
        else{
            secondButton = (Button) event.getSource();
            String b = secondButton.getText();
            String[] b1 = b.split(" ");
            Integer m = Integer.valueOf(b1[0]);
            Integer n = Integer.valueOf(b1[1]);
            System.out.println(" move to :[column: "+ m + " row:" + n + " ]");
            secondSquare = new Square(new Coordinate(m,n),null);
            
            /******check
            System.out.println("check for des:  column:" + secondSquare.getColumnNumber()+" row:" + secondSquare.getRow());
            System.out.println("check for src:  column:" + firstSquare.getColumnNumber()+" row:" + firstSquare.getRow());
        
            /*/
            if(board.move(firstSquare.getCoordinate(), new Coordinate(m,n))==true){
                secondButton.setGraphic(firstButton.getGraphic());
                firstButton.setGraphic(null);
                System.out.println("move is work");  //check for move
                firstSquare.addPiece(null);
                secondSquare.addPiece(now);
            }
             //check
            //System.out.println("column: "+ m + " row:" + n + " " +secondSquare.getPiece());
            //
            firstClick = true;
    }
      
    }
    
}
