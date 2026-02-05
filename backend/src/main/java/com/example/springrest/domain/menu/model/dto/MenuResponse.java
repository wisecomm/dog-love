package com.example.springrest.domain.menu.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * 메뉴 응답 DTO
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MenuResponse {
    private String menuId;
    private String menuName;
    private Long price;
    private String category;
    private String description;
    private String useYn;
    private LocalDateTime sysInsertDtm;
    private String sysInsertUserId;
    private LocalDateTime sysUpdateDtm;
    private String sysUpdateUserId;
}
