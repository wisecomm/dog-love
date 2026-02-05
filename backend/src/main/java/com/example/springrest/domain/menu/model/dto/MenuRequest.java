package com.example.springrest.domain.menu.model.dto;

import lombok.Data;

/**
 * 메뉴 요청 DTO
 */
@Data
public class MenuRequest {
    private String menuId;
    private String menuName;
    private Long price;
    private String category;
    private String description;
    private String useYn;
}
