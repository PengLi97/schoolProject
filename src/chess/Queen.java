/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package chess;

/**
 *
 * @author Cheryl
 */
public class Queen extends Piece {
    
    public Queen(ChessColour colour) {
        super(colour, ChessPieces.QUEEN);
    }
      
    public boolean isLegalMove(ChessBoard board, Coordinate src, Coordinate dest) {
        int curRow = src.getRowNumber();
        int curColumn = src.getColumnNumber();
        Coordinate newCor;
        if (super.isLegalMove(board, src, dest) == true) {
            if (src.getColumnNumber() == dest.getColumnNumber() && src.getRowNumber() == dest.getRowNumber()) {
                int move = Math.abs(src.getColumnNumber() - dest.getColumnNumber());
                for (int i = 1; i < move; i++) {
                    curColumn += 1;
                    curRow += 1;
                    newCor = new Coordinate(curColumn, curRow);
                    if (board.getSquare(newCor).getPiece() != null) {
                        return false;
                    }
                }
                return true;
            }

            int moveRow, moveColumn;

            if (src.getColumnNumber() == dest.getColumnNumber()) {
                moveRow = src.getRowNumber() - dest.getRowNumber();
                if (moveRow < 0) {
                    for (int i = 1; i < moveRow; i++) {
                        curRow -= 1;
                        newCor = new Coordinate(curColumn, curRow);
                        if (board.getSquare(newCor).getPiece() != null) {
                            return false;
                        }
                    }
                    if (moveRow > 0) {
                        for (int i = 1; i < Math.abs(moveRow); i++) {
                            curRow += 1;
                            newCor = new Coordinate(curColumn, curRow);
                            if (board.getSquare(newCor).getPiece() != null) {
                                return false;
                            }
                        }
                    }

                }
                return true;
            }
            if (src.getRowNumber() == dest.getRowNumber()) {
                moveColumn = src.getColumnNumber() - dest.getColumnNumber();
                if (moveColumn > 0) {
                    for (int i = 1; i < moveColumn; i++) {
                        curColumn -= 1;
                        newCor = new Coordinate(curColumn, curRow);
                        if (board.getSquare(newCor).getPiece() != null) {
                            return false;
                        }
                    }

                }
                if (moveColumn < 0) {
                    for (int i = 1; i < Math.abs(moveColumn); i++) {
                        curColumn += 1;
                        newCor = new Coordinate(curColumn, curRow);
                        if (board.getSquare(newCor).getPiece() != null) {
                            return false;
                        }
                    }

                }
                return true;
            }
        }
        return false;
    }
    

    
    
}
